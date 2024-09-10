"use client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { clientCategories } from "@/lib/clientCategories";

import { Label } from "@/components/ui/label";

import { createClient } from "@/actions/client";

import { clientStatus } from "@/lib/clientStatus";
import { ClientSchema } from "@/schemas/client";
import { SubmitButton } from "@/components/shared/SubmitButton";

export default function CreateClientPage() {
  const [lastResult, action] = useActionState(createClient, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ClientSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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
            <CardTitle>Client Details</CardTitle>
            <CardDescription>
              In this form you can create your client
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
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={fields.name.initialValue}
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
                    defaultValue={fields.workSuspended.initialValue}
                  />
                  <p className="text-red-500">{fields.workSuspended.errors}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Category</Label>
                  <Select
                    key={fields.category.key}
                    name={fields.category.name}
                    defaultValue={fields.category.initialValue}
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
                    defaultValue={fields.status.initialValue}
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
              <SubmitButton text="Create Client" />
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
