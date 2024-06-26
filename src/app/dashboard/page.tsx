import DashboardSection from "@/components/component/dashboard-section";
import React from "react";

export const metadata = {
  title: "Dashboard | Singa Article",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <DashboardSection />
    </>
  );
}
