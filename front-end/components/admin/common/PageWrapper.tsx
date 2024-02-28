import Link from "next/link";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const PageWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="h-[100%]">
      <header className="text-center py-4 border-b">
        <h1>{title}</h1>
      </header>
      <div className="flex items-stretch h-[calc(100%-57px)]">
        <Navbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
