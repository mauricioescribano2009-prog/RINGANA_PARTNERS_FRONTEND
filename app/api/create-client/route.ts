import { NextResponse } from "next/server";

import { getPartner } from "@/lib/registry";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const hostname = request.headers.get("host") ?? "";


  let partnerCode: string;

if (
  hostname.startsWith("localhost") ||
  hostname.startsWith("127.0.0.1")
) {

  partnerCode = "4204981";

} else {

  const subdomain = hostname.split(".")[0];

  partnerCode = subdomain.replace(/^[A-Za-z]+/, "");

}

const partner = await getPartner(partnerCode);

console.log("==================================");
console.log("PHONE DEBUG");
console.log("==================================");

console.table({
  client_country: body.client_country,
  countryCode: body.countryCode,
  phonePrefix: body.phonePrefix,
  phoneNumber: body.phoneNumber,
});


    console.log("==================================");
    console.log("JSON RECIBIDO DEL FRONTEND");
    console.log("==================================");

    console.log(JSON.stringify(body, null, 2));

    // ==========================================
    // CONSTRUCCIÓN DEL PAYLOAD PARA WF01
    // ==========================================

    console.log("body.client_country =", body.client_country);
    console.log("body.country =", body.country);

    const payload = {

      // Metadatos

      lead_id: crypto.randomUUID(),

      source: `${partner.assistant.subdomain}.ringanaassistant.com`,

partner_name: partner.partner.name,

partner_code: partner.partner.code,

partner_location: partner.ringana.location,

partner_language: partner.assistant.language.toUpperCase(),

ringana_email: partner.ringana.email,

n8n_credential: partner.ringana.credential,

      form_version: "WF01_FORM_V1.1",

      workflow_version: "WF02_PROCESS_PENDING_V1",

      // Datos personales

      salutation: body.salutation,

      first_name: body.firstName,

      last_name: body.lastName,

      birth_date: `${body.birthDate}T00:00:00.000Z`,

      email: body.email,

      newsletter: body.newsletter,

      tax_number: body.taxNumber,

      // Idioma

      language: partner.assistant.language.toUpperCase(),

      // Dirección

      country: body.client_country,

      address_search: "",

      street_type: "CALLE",

      street_name: body.streetName,

      street_number: body.streetNumber,

      staircase: "",

      floor: "",

      door: "",

      address_notes: "",

      postal_code: body.postalCode,

      city: body.city,

      country_code: body.countryCode,

      // Teléfono

      contact_type: "TELÉFONO MÓVIL",

      phone_country: body.client_country,

      phone_prefix: body.phonePrefix,

      phone_number: body.phoneNumber,

      contact_schedule: body.contactSchedule,

      contact_time: "AFTERNOON",

      // Información comercial

      main_goal: null,

      selected_products: [],

      comments: null,

      // Estado Ringana

      ringana_client_created: false,

      ringana_client_id: null,

      ringana_creation_timestamp: null,

      ringana_error_code: null,

      ringana_error_message: null,

    };

    console.log("payload.country =", payload.country);
    console.log("payload.phone_country =", payload.phone_country);    

    console.log("==================================");
    console.log("PAYLOAD WF01");
    console.log("==================================");

    console.log(JSON.stringify(payload, null, 2));

    
    // ==========================================
    // TODAVÍA ENVIAMOS EL BODY ORIGINAL
    // ==========================================

    const wf01Response = await fetch(
  process.env.WF01_URL!,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }
);
    const result = await wf01Response.text();

    console.log("==================================");
    console.log("RESPUESTA WF01");
    console.log("==================================");

    console.log("STATUS:", wf01Response.status);
    console.log("OK:", wf01Response.ok);
    console.log(result);

    if (!wf01Response.ok) {

  return NextResponse.json(
    {
      success: false,
      error: result,
    },
    {
      status: wf01Response.status,
    }
  );
}

   return NextResponse.json({

  success: true,

  lead_id: payload.lead_id

});

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }

}