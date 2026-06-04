import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SecureCheckoutCard() {
  return (
    <Card className="border-dashed py-4">
      <CardContent className="px-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <Shield className="size-5" />
          </div>

          <div>
            <h4 className="font-medium">Secure Checkout</h4>

            <p className="mt-1 text-xs text-muted-foreground">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
