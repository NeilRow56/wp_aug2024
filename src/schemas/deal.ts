import { z } from "zod";

export const DealSchema = z.object({
  name: z.string({ message: "Name is required" }).min(5, {
    message: "Name must be at least 5 characters",
  }),
  link: z
    .string({ message: "Link is required" })
    .url("Link must be a valid URL"),
  couponCode: z
    .string({ message: "Coupon code is required" })
    .min(5, "Coupon code must be at least 5 characters"),
  discount: z.coerce
    .number({ message: "Discount percentage is required" })
    .min(1, "Discount percentage must be 1 or greater")
    .max(100),
});
