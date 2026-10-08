"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}