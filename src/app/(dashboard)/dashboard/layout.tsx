import Link from "next/link";
import { ReactNode } from "react";
// import Logo from "../../../public/logo.svg";
import { Logo } from "@/components/shared/Logo";
import Image from "next/image";

import {
  CircleUser,
  FileStack,
  Globe,
  Home,
  MapPinCheckInside,
  PoundSterlingIcon,
  SquareCheck,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { DashboardItems } from "@/components/dashboard/DashBoardItems";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

export const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    name: "Completion",
    href: "/dashboard/completion",
    icon: SquareCheck,
  },
  {
    name: "Planning",
    href: "/dashboard/planning",
    icon: MapPinCheckInside,
  },
  {
    name: "Working Papers",
    href: "/dashboard/working_papers",
    icon: FileStack,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo />
            </Link>
          </div>

          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="flex-1 md:hidden">
            <nav className="flex items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-x-5">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <LogoutLink>Log out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}
