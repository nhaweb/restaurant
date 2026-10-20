"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const MenuBoard = dynamic(
  () => import("@/components/menu/MenuBoard").then((mod) => mod.MenuBoard),
  { ssr: true },
);

type Props = ComponentProps<typeof MenuBoard>;

export function MenuBoardLazy(props: Props) {
  return <MenuBoard {...props} />;
}
