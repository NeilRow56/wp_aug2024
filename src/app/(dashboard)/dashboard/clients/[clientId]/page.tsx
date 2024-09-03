import { notFound, redirect } from "next/navigation";

import db from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, Edit, PlusCircle } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(clientId: string) {
  const data = await db.currentFile.findMany({
    where: {
      id: clientId,
    },
    select: {
      period: true,
      periodEndDate: true,
      Client: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      periodEndDate: "desc",
    },
  });

  return data;
}

export default async function ClientIDPage({
  params,
}: {
  params: { clientId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const data = await getData(params.clientId);
  return (
    <>
      <div className="container flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={"/"}>
            <Book className="mr-2 size-4" />
            View What?
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/clients/${params.clientId}/edit`}>
            <Edit className="mr-2 size-4" />
            Edit
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/clients/${params.clientId}/createFile`}>
            <PlusCircle className="mr-2 size-4" />
            Create File
          </Link>
        </Button>
      </div>
      <div className="container flex w-full">
        <div>
          <h2 className="text-3xl font-bold text-primary">Client name</h2>
        </div>
      </div>

      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You dont have any Files created"
          description="You currently dont have any files. When created you can see them right here"
          buttonText="Create File"
          href={`/dashboard/clients/1/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>
                Manage your Files in a simple and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">File Title</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500"
                      >
                        Archived
                      </Badge>
                    </TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
