import { EditFileForm } from "@/components/client/EditFileForm";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(currentFileId: string) {
  const data = await db.currentFile.findUnique({
    where: {
      id: currentFileId,
    },
    select: {
      period: true,
      slug: true,
      shortDate: true,
      periodStart: true,
      periodEnd: true,
      clientId: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ClientFileEdit({
  params,
}: {
  params: { clientId: string; currentFileId: string };
}) {
  const data = await getData(params.currentFileId);
  return <EditFileForm data={data} clientId={params.clientId} />;
}
