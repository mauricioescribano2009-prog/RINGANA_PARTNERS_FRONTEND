import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  const lead_id = searchParams.get("lead_id");

  if (!lead_id) {
    return NextResponse.json(
      { error: "lead_id requerido" },
      { status: 400 }
    );
  }

  const response = await fetch(
    "https://n8n.ringanaassistant.com/webhook/api/v1/lead-status?lead_id=" + lead_id
  );

  const result = await response.json();

  return NextResponse.json(result);

}