import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/clients/${params.clientId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
    </>
  );
}
