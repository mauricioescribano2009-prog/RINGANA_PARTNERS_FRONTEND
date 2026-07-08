import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const hostname = request.headers.get("host") ?? "";

  // ==========================
  // DESARROLLO LOCAL
  // ==========================

  if (
    hostname.startsWith("localhost") ||
    hostname.startsWith("127.0.0.1")
  ) {

    return NextResponse.json({

      country: "ESP",

      partner_code: "4204981",

      partner_name: "Candela Arroyo",

      ringana_email: "candelarroyo@gmail.com",

      n8n_credential: "RINGANA_CANDELA"

    });

  }

  // ==========================
  // PRODUCCIÓN
  // ==========================

  const subdomain = hostname.split(".")[0];

  const country = subdomain.substring(0, 3).toUpperCase();

  const partner_code = subdomain.substring(3);

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