/* THROWAWAY PROTOTYPE
   Three variants of the Chocolate home page, switchable via ?variant=A|B|C
   on the /prototype/home route. Delete once a direction is chosen. */

import { Suspense } from "react";
import { PrototypeSwitcher } from "@/components/prototype-switcher";
import VariantA, { NAME as NAME_A } from "./variant-a";
import VariantB, { NAME as NAME_B } from "./variant-b";
import VariantC, { NAME as NAME_C } from "./variant-c";

const NAMES: Record<string, string> = { A: NAME_A, B: NAME_B, C: NAME_C };

export default async function PrototypeHome({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const key = variant?.toUpperCase() === "B" ? "B" : variant?.toUpperCase() === "C" ? "C" : "A";

  return (
    <>
      {key === "A" && <VariantA />}
      {key === "B" && <VariantB />}
      {key === "C" && <VariantC />}
      <Suspense fallback={null}>
        <PrototypeSwitcher variants={["A", "B", "C"]} names={NAMES} current={key} />
      </Suspense>
    </>
  );
}
