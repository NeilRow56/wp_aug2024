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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, Edit, MoreHorizontal, PlusCircle } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Badge } from "@/components/ui/badge";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { requireUser } from "@/lib/requireUser";

async function getData(userId: string, clientId: string) {
  const data = await db.currentFile.findMany({
    where: {
      clientId: clientId,
      userId: userId,
    },
    select: {
      period: true,
      slug: true,
      createdAt: true,
      id: true,
      Client: {
        select: {
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function getClientDetails(clientId: string) {
  const clientDetails = await db.client.findUnique({
    where: {
      id: clientId,
    },
  });

  return clientDetails;
}

export default async function ClientIDPage({
  params,
}: {
  params: { clientId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");

  const data = await getData(user.id, params.clientId);
  const clientDetails = await getClientDetails(params.clientId);
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
        <div className="my-8">
          <h2 className="text-3xl font-bold text-primary">
            {clientDetails?.name}
          </h2>
        </div>
      </div>

      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="You dont have any Files created"
          description="You currently dont have any files. When created you can see them right here"
          buttonText="Create File"
          href={`/dashboard/clients/${params.clientId}/createFile`}
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
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.period}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500"
                        >
                          Published
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-GB", {
                          dateStyle: "medium",
                        }).format(item.createdAt)}
                      </TableCell>

                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${params.clientId}/${item.id}`}
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${params.clientId}/${item.id}/delete`}
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
