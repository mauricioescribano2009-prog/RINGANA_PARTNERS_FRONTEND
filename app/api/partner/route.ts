import { NextRequest, NextResponse } from "next/server";
import { getPublicPartner } from "@/lib/registry";

export async function GET(request: NextRequest) {

  const hostname = request.headers.get("host") ?? "";

  let partnerCode: string;

  // ==========================
  // DEVELOPMENT
  // ==========================

  if (
    hostname.startsWith("localhost") ||
    hostname.startsWith("127.0.0.1")
  ) {

    partnerCode = "4204981";

  }

  // ==========================
  // PRODUCCIÓN
  // ==========================

  else {

    const subdomain = hostname.split(".")[0];

    // Formato actual:
    // esp4204981
    // Formato futuro:
    // eses4204981

    partnerCode = subdomain.replace(/^[A-Za-z]+/, "");

  }

 try {

const partner = await getPublicPartner(partnerCode);

return NextResponse.json(partner);

} catch (error) {

  console.error(error);

  return NextResponse.json(
    {
      error: "Partner no encontrado"
    },
    {
      status: 404
    }
  );

}

}