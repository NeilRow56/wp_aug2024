import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { PartyPopper, ShoppingBag, User2, PoundSterling } from "lucide-react";

async function getData() {
  const [client] = await Promise.all([
    db.client.findMany({
      select: {
        id: true,
      },
    }),
  ]);

  return {
    client,
  };
}

export async function DashboardStats() {
  const { client } = await getData();
  let totalAmount = 1525;

  //   const totalAmount = order.reduce((accumalator, currentValue) => {
  //     return accumalator + currentValue.amount;
  //   }, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <PoundSterling className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            £{new Intl.NumberFormat("en-US").format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+Orders</p>
          <p className="text-xs text-muted-foreground">
            Total Sales on ShoeMarshal
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Products</p>
          <p className="text-xs text-muted-foreground">
            Total Products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Clients</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{client.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Clients on WpAccPac
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
