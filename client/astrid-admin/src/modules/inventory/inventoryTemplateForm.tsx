"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

interface InventoryFormProps {
  isEdit: boolean;
}
export default function InventoryTemplateForm({ isEdit }: InventoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader className="pl-6 pt-6 pb-2">
          <CardTitle>
            {isEdit === true ? "Edit Template" : "New Template"}
          </CardTitle>
          <CardDescription>
            {isEdit === true
              ? "Edit existing item template"
              : "Create a new item template"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEdit ? (
                <Button type="submit">Submit</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
