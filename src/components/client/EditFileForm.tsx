"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import slugify from "react-slugify";
import { toast } from "sonner";
import React, { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ClientFileSchema } from "@/schemas/clientFile";
import { Button } from "../ui/button";
import { Atom, ChevronLeft } from "lucide-react";
import { SubmitButton } from "../shared/SubmitButton";
import { EditFileActions } from "@/actions/clientFile";
import Link from "next/link";

interface EditFileFormProps {
  data: {
    slug: string;
    period: string;
    shortDate: number;
    periodStart: any;
    periodEnd: any;
    clientId: string;
    id: string;
  };
  clientId: string;
}

export function EditFileForm({ data, clientId }: EditFileFormProps) {
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [period, setPeriod] = useState<undefined | string>(data.period);

  const [lastResult, action] = useActionState(EditFileActions, undefined);
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/clients/${clientId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Client Files</h1>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <Card className="w-full max-w-[700px]">
          <CardHeader>
            <CardTitle className="space-y-2 text-3xl font-bold text-primary">
              File Details
            </CardTitle>
            <CardDescription>
              Sumary details of currently selected file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id={form.id}
              onSubmit={form.onSubmit}
              action={action}
              className="flex flex-col gap-6"
            >
              <input type="hidden" name="currentFileId" value={data.id} />
              <input type="hidden" name="clientId" value={data.id} />
              <div className="grid gap-2">
                <Label>Period </Label>

                <Input
                  key={fields.period.key}
                  name={fields.period.name}
                  defaultValue={fields.period.initialValue}
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
                  defaultValue={data.periodStart.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  type="text"
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
                  defaultValue={data.periodEnd.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  type="text"
                  placeholder=" 01.01.2023"
                />
                <p className="text-sm text-red-500">
                  {fields.periodEnd.errors}
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Short date (number e.g. 2024) </Label>
                <Input
                  className="px-4"
                  key={fields.shortDate.key}
                  name={fields.shortDate.name}
                  defaultValue={data.shortDate}
                  type="number"
                />
                <p className="text-sm text-red-500">{fields.period.errors}</p>
              </div>

              <SubmitButton text="Edit File" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
