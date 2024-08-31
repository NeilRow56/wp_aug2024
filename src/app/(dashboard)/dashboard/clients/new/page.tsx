"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { clientCategories } from "@/lib/clientCategories";
import { clientStatus } from "@/lib/clientStatus";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Collection name must be at least 4 characters",
  }),
  category: z.enum([
    "limited_company_large",
    "limited_company_small",
    "limited_company_very_small",
    "partnership",
    "sole_trader",
    "charity",
    "other",
  ]),
  status: z.enum(["awaiting_ml_checks", "active", "archived"]),
});

const handleSubmit = (values: z.infer<typeof FormSchema>) => {
  console.log({ values });
};

export default function NewClientPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <>
      <div className="flex flex-1 flex-col items-center gap-4">
        <Card className="max-w-2xl flex-col text-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              Create Client
            </CardTitle>
            <CardDescription>
              Create your Client here. Click the button below once your done...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="w-full space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Client name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Client name as shown on statutory accounts or tax
                          return
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl">Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an entity type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clientCategories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the current status of the entity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clientStatus.map((status) => (
                              <SelectItem key={status.id} value={status.name}>
                                {status.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
