import { DashboardStats } from "@/components/dashboard/DashboardStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col">
      <DashboardStats />
      <div className="md:gp-8 mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>Chart</CardContent>
        </Card>
      </div>
    </div>
  );
}
