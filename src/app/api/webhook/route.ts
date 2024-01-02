/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_SIGNIN_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`WebHook Error : ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.expired") {
    const paymentId = session?.metadata?.paymentId ?? "";
    const userId = session?.metadata?.userId;
    try {
      await db.payment.delete({
        where: {
          id: paymentId,
          userId,
        },
      });
    } catch (error: any) {
      return new NextResponse(` Error delete payment : ${error.message}`, {
        status: 400,
      });
    }
  }

  if (event.type === "checkout.session.completed") {
    const paymentId = session?.metadata?.paymentId ?? "";
    const userId = session?.metadata?.userId;

    if (userId) {
      try {
        // Fetch payment information including associated data
        const payment = await db.payment.findUnique({
          where: {
            id: paymentId,
          },
          include: {
            dataPayment: true,
          },
        });
        // Throw an error if payment information is not found
        if (!payment) {
          throw new Error("error");
        }

        //change status

        await db.dataPayment.updateMany({
          where: {
            paymentId: payment.id,
          },
          data: {
            status: "paid",
          },
        });

        // Delete items from the cart associated with the payment
        if (
          payment.dataPayment.at(0)?.cartId !== null &&
          typeof payment.dataPayment.at(0)?.cartId === "string"
        ) {
          console.log(payment.dataPayment.at(0)?.cartId);
          await db.cart.deleteMany({
            where: {
              id: { in: payment.dataPayment.map((item) => item.cartId ?? "") },
            },
          });
        }

        // Find the admin user and update their notification status
        const admin = await db.user.findFirst({
          where: {
            role: "admin",
          },
        });
        await db.user.update({
          where: {
            id: admin?.id,
          },
          data: {
            hasNotify: true,
            notify: {
              create: {
                comment:
                  "Payment Confirmation: A purchase has been successfully paid for and requires your attention, Admin. Please proceed accordingly",
                paymentId,
              },
            },
          },
        });

        //create notification payment has success
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotify: true,
            notify: {
              create: {
                comment:
                  "Payment Confirmation: A purchase has been successfully",
                paymentId,
              },
            },
          },
        });

        // Update product information - increment selling count, decrement stock count
        const updateOperations = payment.dataPayment.map((item) => ({
          where: {
            id: item.productId,
          },
          data: {
            selling: {
              increment: item.totalProduct,
            },
            stock: {
              decrement: item.totalProduct,
            },
          },
        }));

        // Perform updates for all products concurrently
        await Promise.all(
          updateOperations.map((operation) =>
            db.products.update({
              where: operation.where,
              data: operation.data,
            }),
          ),
        );
      } catch (error: any) {
        // Catch and log any errors
        console.error("Error parsing productId JSON:", error);
        // Return an error response
        return new NextResponse(`WebHook Error : ${error.message}`, {
          status: 400,
        });
      }
    }

    return new NextResponse("ok", { status: 200 });
  }
}
