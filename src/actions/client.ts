"use server";

import { CreateClientSchema, CreateClientSchemaType } from "@/client";
import db from "@/lib/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const createCollection = async (values: CreateClientSchemaType) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  const validatedFields = CreateClientSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, category, status } = validatedFields.data;
  // To check disabled and "spinner"
  // await wait(5000);

  await db.client.create({
    data: {
      userId: user.id,
      name,
      category,
      status,
    },
  });

  return { success: "Client created successfully!" };
};
