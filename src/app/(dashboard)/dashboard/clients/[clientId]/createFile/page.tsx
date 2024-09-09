"use client";

import { CreateClientFileAction } from "@/actions/clientFile";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Atom } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ClientFileSchema } from "@/schemas/clientFile";
import slugify from "react-slugify";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import { FormControl } from "@/components/ui/form";

export default function CreateFilePage({
  params,
}: {
  params: { clientId: string };
}) {
  const [slug, setSlugValue] = useState<undefined | string>("");
  const [period, setPeriod] = useState<undefined | string>("");

  const [lastResult, action] = useActionState(
    CreateClientFileAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ClientFileSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const periodInput = period;

    if (periodInput?.length === 0 || periodInput === undefined) {
      return toast.error("Pleaes create a period first");
    }

    setSlugValue(slugify(periodInput));

    return toast.success("Slug has been created");
  }
  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-12" asChild>
          <Link href={`/dashboard/clients/${params.clientId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-primary">Create File</h1>
      </div>
      <Card className="container max-w-[700px]">
        <CardHeader>
          <CardTitle>File Details</CardTitle>
          <CardDescription>Add basic file information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="flex flex-col gap-6"
          >
            <input type="hidden" name="clientId" value={params.clientId} />
            <div className="grid gap-2">
              <Label>Period </Label>

              <Input
                key={fields.period.key}
                name={fields.period.name}
                // defaultValue={fields.period.initialValue}
                placeholder="Period ending 31.12.2023"
                onChange={(e) => setPeriod(e.target.value)}
                value={period}
              />

              <p className="text-sm text-red-500">{fields.period.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="File Slug"
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
              />
              <Button
                onClick={handleSlugGeneration}
                className="w-fit"
                variant="secondary"
                type="button"
              >
                <Atom className="mr-2 size-4" /> Generate Slug
              </Button>
              <p className="text-sm text-red-500">{fields.slug.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Period start date </Label>
              <Input
                key={fields.periodStart.key}
                name={fields.periodStart.name}
                defaultValue={fields.periodStart.initialValue}
                type="date"
                placeholder=" 01.01.2023"
              />
              <p className="text-sm text-red-500">
                {fields.periodStart.errors}
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Period end date </Label>
              <Input
                key={fields.periodEnd.key}
                name={fields.periodEnd.name}
                defaultValue={fields.periodEnd.initialValue}
                type="date"
                placeholder=" 01.01.2023"
              />
              <p className="text-sm text-red-500">{fields.periodEnd.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Short date (number) </Label>
              <Input
                key={fields.shortDate.key}
                name={fields.shortDate.name}
                defaultValue={fields.shortDate.initialValue}
                placeholder="2024 (If two periods end in the same calendar year add .2 to second period))"
                type="number"
              />
              <p className="text-sm text-red-500">{fields.period.errors}</p>
            </div>

            <SubmitButton text="Create File" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
