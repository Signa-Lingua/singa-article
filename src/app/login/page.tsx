import React from "react";
import { getUser } from "../user/action";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/user");
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to Singa Article Dashboard App
        </h1>
        <p className="text-lg">
          Please login to continue or go to article page
        </p>
        <p className="text-lg">
          click{" "}
          <Link
            href="/articles"
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700 hover:underline"
          >
            here
          </Link>{" "}
          to go to article page
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
