"use client";
import { useMediaQuery } from "usehooks-ts";

export default function Header() {
  // const isDesktop = useMediaQuery("(min-width: 640px)", {
  //   initializeWithValue: false,
  // });

  // if (!isDesktop) return null;

  return (
    <header className="w-full bg-gray-100 p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Chonky Web</h1>
    </header>
  );
}
