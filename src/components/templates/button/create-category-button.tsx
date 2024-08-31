import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type Option } from "@/types";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  inputvalue: string;
  id?: string;
  onValueSelect: (values: Option) => void;
};

export const CreateCategoryButton = ({
  inputvalue,
  id,
  onValueSelect,
}: Props) => {
  const ctx = api.useUtils();

  const addCategory = api.category.post.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: async (e) => {
      onValueSelect({
        label: e.name,
        value: e.id,
      });
      await ctx.category.getall.invalidate();
    },
  });

  const addSub = api.subcategory.post.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: async (e) => {
      onValueSelect({
        label: e.name,
        value: e.id,
      });
      await ctx.subcategory.list.invalidate();
    },
  });

  const handleCreate = () => {
    if (id) {
      return addSub.mutate({
        name: inputvalue,
        category: id,
      });
    } else {
      return addCategory.mutate({
        name: inputvalue,
      });
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-start text-left text-sm"
      onClick={handleCreate}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add `{inputvalue}`
    </Button>
  );
};
