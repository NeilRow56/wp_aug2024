import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, User2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function ClientsPage() {
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/clients/new"}>
            <PlusCircle className="mr-2 size-4" /> Create Client
          </Link>
        </Button>
      </div>
      <EmptyState
        title="You dont have any Clients created"
        description="You currently dont have any Clients. Once created you can
        see them here!"
        buttonText="Create Client"
        href="/dashboard/clients/new"
      />
      <div className="flex w-full items-center justify-center">
        <Card className="w-[400px]">
          <div className="flex gap-2">
            <User className="size=24" />
            <User2 className="size=24" />
          </div>

          <CardHeader>
            <CardTitle className="truncate">Table</CardTitle>
            <CardDescription className="line-clamp-3"></CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
