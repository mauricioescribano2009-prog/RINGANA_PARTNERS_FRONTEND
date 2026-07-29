import { NextRequest, NextResponse } from "next/server";
import {
  getPublicPartner,
  resolvePartnerCode
} from "@/lib/registry";

export async function GET(request: NextRequest) {

  try {

    const hostname =
      request.headers.get("host") ?? "";

    const partnerCode =
      resolvePartnerCode(hostname);

    const partner =
      await getPublicPartner(partnerCode);

    return NextResponse.json(partner);

  } catch (error) {

    console.error(
      "Error resolviendo Partner:",
      error
    );

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