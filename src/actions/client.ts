"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { ClientSchema } from "@/schemas/client";
import { toast } from "sonner";

export async function createClient(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await db.client.create({
    data: {
      name: submission.value.name,
      status: submission.value.status,
      workSuspended: submission.value.workSuspended === true ? true : false,
      category: submission.value.category,
      userId: user.id,
    },
  });

  redirect("/dashboard/clients");
}

export async function editClientAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: ClientSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const clientId = formData.get("clientId") as string;
  await db.client.update({
    where: {
      id: clientId,
    },
    data: {
      name: submission.value.name,

      category: submission.value.category,

      workSuspended: submission.value.workSuspended === true ? true : false,
      status: submission.value.status,
    },
  });

  redirect("/dashboard/clients");
}

export async function deleteClient(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //Set this to senior company admin person. At present it will not allow us to delete a client
  // if (!user || user.email !== "jan@alenix.de") {
  if (!user) {
    return redirect("/");
  }

  const data = await db.client.delete({
    where: {
      id: formData.get("clientId") as string,
    },
  });

  return redirect("/dashboard/clients");
}
