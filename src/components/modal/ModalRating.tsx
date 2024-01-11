"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/form/Form";
import { MinusIcon, PlusIcon } from "lucide-react";

import { toast } from "sonner";
import { api } from "@/trpc/react";

type Props = {
  productId: string;
};

const formSchema = z.object({
  productId: z.string(),
  value: z.number(),
  comment: z.string(),
});

const ModalRating = ({ productId }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId,
      value: 5,
      comment: "",
    },
  });

  const { mutate, isLoading } = api.rating.createRating.useMutation({
    onSuccess: () => {
      toast.success("Ratting was added");
      onClose();
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat" size="sm">
        Add Ratting
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add rattings
              </ModalHeader>
              <ModalBody>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem className="mb-5 border-b">
                          <FormControl>
                            <div className="mb-2 flex justify-between">
                              <p>Rattings</p>
                              <div className="flex items-center gap-3">
                                <Button
                                  isIconOnly
                                  variant="light"
                                  size="sm"
                                  onClick={() => {
                                    if (field.value > 1) {
                                      form.setValue("value", field.value - 1); // Mengurangi nilai
                                    }
                                  }}
                                >
                                  <MinusIcon />
                                </Button>
                                <p className="h-5 w-5 text-center">
                                  {field.value}
                                </p>
                                <Button
                                  isIconOnly
                                  variant="light"
                                  size="sm"
                                  onClick={() => {
                                    if (field.value < 5) {
                                      form.setValue("value", field.value + 1); // Menambah nilai
                                    }
                                  }}
                                >
                                  <PlusIcon />
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder="Commnet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <ModalFooter className="px-0">
                      <Button
                        isLoading={isLoading}
                        color="primary"
                        className="w-full"
                        size="md"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRating;
