"use server";

import { DealSchema } from "@/schemas/deal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const formHandlerAction = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const unvalidatedDeal = {
    name: formData.get("name"),
    link: formData.get("link"),
    couponCode: formData.get("couponCode"),
    discount: formData.get("discount"),
  };

  const validatedFields = DealSchema.safeParse(unvalidatedDeal);

  return { successMsg: "Deal added successfully" };
};
