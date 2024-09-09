"use server";

import db from "@/lib/db";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { ClientFileSchema } from "@/schemas/clientFile";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function CreateClientFileAction(
  prevState: any,
  formData: FormData,
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: ClientFileSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  // console.log(formData);
  const data = await db.currentFile.create({
    data: {
      period: submission.value.period,
      slug: submission.value.slug,
      shortDate: submission.value.shortDate,
      periodStart: submission.value.periodStart,
      periodEnd: submission.value.periodEnd,

      userId: user.id,
      clientId: formData.get("clientId") as string,
    },
  });

  return redirect(`/dashboard/clients/${formData.get("clientId")}`);
}
