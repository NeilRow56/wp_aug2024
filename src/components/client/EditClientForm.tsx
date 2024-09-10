"use client";

import { $Enums } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Switch } from "../ui/switch";
import { clientCategories } from "@/lib/clientCategories";
import { clientStatus } from "@/lib/clientStatus";
import { SubmitButton } from "../shared/SubmitButton";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ClientSchema } from "@/schemas/client";
import { editClientAction } from "@/actions/client";
import { useActionState } from "react";

interface EditClientProps {
  data: {
    id: string;
    name: string;
    status: $Enums.ClientStatus;
    category: $Enums.ClientCategory;
    workSuspended: boolean;
  };
}

export function EditClientForm({ data }: EditClientProps) {
  const [lastResult, action] = useActionState(editClientAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ClientSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  console.log(data);

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/clients">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Clients</h1>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <Card className="w-full max-w-[650px]">
          <CardHeader>
            <CardTitle className="space-y-2 text-3xl font-bold text-primary">
              Client Details
            </CardTitle>
            <CardDescription>
              Edit client information in the form below.
            </CardDescription>
          </CardHeader>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="mx-auto"
          >
            <CardContent>
              <div className="flex flex-col gap-6">
                <input type="hidden" name="clientId" value={data.id} />
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={data.name}
                    className="w-full"
                    placeholder="Client Name"
                  />
                  <p className="text-red-500">{fields.name.errors}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Work Suspended</Label>
                  <Switch
                    key={fields.workSuspended.key}
                    name={fields.workSuspended.name}
                    defaultChecked={data.workSuspended}
                  />
                  <p className="text-red-500">{fields.workSuspended.errors}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Category</Label>
                  <Select
                    key={fields.category.key}
                    name={fields.category.name}
                    defaultValue={data.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">{fields.category.errors}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Status</Label>
                  <Select
                    key={fields.status.key}
                    name={fields.status.name}
                    defaultValue={data.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientStatus.map((status) => (
                        <SelectItem key={status.id} value={status.name}>
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">{fields.category.errors}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton text="Update Client" />
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
