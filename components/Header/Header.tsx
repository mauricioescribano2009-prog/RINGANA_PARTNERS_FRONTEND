"use client";

import { useEffect, useState } from "react";
import { getPartner } from "@/lib/getPartner";

export default function Header() {

  const [partnerName, setPartnerName] =
    useState("RINGANA PARTNERS");

  useEffect(() => {

    getPartner()
      .then((partner) => {

        setPartnerName(
          partner.partner.name
        );

      })
      .catch(() => {

        setPartnerName(
          "RINGANA PARTNERS"
        );

      });

  }, []);

  return (

    <header className="text-center mb-12">

      <div className="inline-block mb-6 rounded-md bg-amber-500 px-4 py-2 text-sm font-bold tracking-wider text-white uppercase shadow">
        RINGANA ASSISTANT
      </div>

      <p className="mx-auto max-w-[320px] text-3xl font-bold leading-tight text-green-700 break-words">
  {partnerName}
</p>

    </header>

  );

}