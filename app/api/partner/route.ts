import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const hostname = request.headers.get("host") ?? "";

  let country: string;
  let partner_code: string;

  // ==========================
  // DEVELOPMENT V10
  // ==========================

  if (
    hostname.startsWith("localhost") ||
    hostname.startsWith("127.0.0.1")
  ) {

    country = "ESP";
    partner_code = "4204981";

  }

  // ==========================
  // URL INTERNACIONAL (V10)
  // ==========================

  else {

    const subdomain = hostname.split(".")[0];

    // Temporalmente seguimos utilizando el formato V1
    // Hasta que activemos las URLs internacionales.
    country = subdomain.substring(0, 3).toUpperCase();
    partner_code = subdomain.substring(3);

  }

  // ==========================
  // CONSULTA AL WF04
  // ==========================

  const response = await fetch(process.env.PARTNER_API_URL!, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      country,
      partner_code,
    }),

    cache: "no-store",

  });

  if (!response.ok) {

    return NextResponse.json(
      { error: "Partner no encontrado" },
      { status: 404 }
    );

  }

  const partner = await response.json();

  return NextResponse.json(partner);

}