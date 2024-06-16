"use client";

import { Home, Menu, Newspaper, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAuthUser from "@/hooks/useAuthUser";
import useLogout from "@/hooks/useLogout";
export default function MobileMenu() {
  const { mutate, status } = useLogout();
  const { data, status: authUserStatus } = useAuthUser();

  const location = usePathname();

  function isActiveMobile(bool: boolean) {
    return bool
      ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
      : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Singa</span>
            </Link>
            <Link href="/" className={isActiveMobile(location === "/")}>
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href={"/articles"}
              className={isActiveMobile(location === "/articles")}
            >
              <Newspaper className="h-5 w-5" />
              Articles
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          {authUserStatus === "pending" ? (
            <Skeleton className="h-10 w-10" />
          ) : (
            <Avatar className="h-10 w-10 border">
              <AvatarImage alt={data?.name} src={data?.avatarUrl ?? ""} />
              <AvatarFallback>{data?.name?.[0]}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>Change Theme</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => mutate()}
            disabled={status === "pending"}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
