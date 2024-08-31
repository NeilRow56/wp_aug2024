import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Divide } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div className="flex min-h-screen flex-col items-center space-y-4 p-8 sm:p-20">
      <Hero />
      {session ? (
        <div className="flex gap-6">
          <LogoutLink>
            <Button className="bg-red-700 text-white">Logout</Button>
          </LogoutLink>
          <Button asChild className="bg-green-700 text-white">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
        </div>
      )}
    </div>
  );
}
