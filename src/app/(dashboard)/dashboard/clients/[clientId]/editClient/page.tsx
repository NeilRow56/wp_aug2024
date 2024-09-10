import { notFound } from "next/navigation";

import db from "@/lib/db";
import { EditClientForm } from "@/components/client/EditClientForm";

async function getData(clientId: string) {
  const data = await db.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  const data = await getData(params.clientId);

  return <EditClientForm data={data} />;
}
