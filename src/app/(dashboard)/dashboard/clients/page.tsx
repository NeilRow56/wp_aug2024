import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, User2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { DataTable } from "./newClient/data-table";
import { columns } from "./columns";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await db.client.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
}

export default async function ClientsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/clients/newClient"}>
            <PlusCircle className="mr-2 size-4" /> Create Client
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You dont have any Clients created"
          description="You currently dont have any Clients. Once created you can
        see them here!"
          buttonText="Create Client"
          href="/dashboard/clients/newClient"
        />
      ) : (
        <div className="max-auto container">
          <Card>
            <CardHeader>
              <CardTitle className="mb-2 font-bold text-primary">
                Clients
              </CardTitle>
              <CardDescription>
                Manage your Clients in a simple and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
