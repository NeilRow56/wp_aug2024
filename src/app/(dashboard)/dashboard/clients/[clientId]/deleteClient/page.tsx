import { deleteClient } from "@/actions/client";

import { SubmitButton } from "@/components/shared/SubmitButton";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col space-y-2">
              <h2>Are you absolutely sure you want to</h2>

              <span className="text-red-500">DELETE THIS CLIENT?</span>
            </div>
          </CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            client and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/clients/${params.clientId}`}>Cancel</Link>
          </Button>
          <form action={deleteClient}>
            <input type="hidden" name="clientId" value={params.clientId} />
            <SubmitButton variant="destructive" text="Delete File" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
