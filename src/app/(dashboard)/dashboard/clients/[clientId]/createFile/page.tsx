"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Atom } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CreateFilePage({
  params,
}: {
  params: { clientId: string };
}) {
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
      <Card>
        <CardHeader>
          <CardTitle>File Details</CardTitle>
          <CardDescription>Add basic file information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <input type="hidden" name="siteId" value={params.clientId} />
            <div className="grid gap-2">
              <Label>Period </Label>
              <Input placeholder="2024" />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="File Slug" />
              <Button
                onClick={() => {}}
                className="w-fit"
                variant="secondary"
                type="button"
              >
                <Atom className="mr-2 size-4" /> Generate Slug
              </Button>
            </div>

            <SubmitButton text="Create File" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
