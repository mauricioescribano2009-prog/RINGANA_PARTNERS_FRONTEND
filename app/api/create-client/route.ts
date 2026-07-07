import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    console.log("==================================");
    console.log("JSON RECIBIDO DEL FRONTEND");
    console.log("==================================");

    console.log(JSON.stringify(body, null, 2));

    // ==========================================
    // CONSTRUCCIÓN DEL PAYLOAD PARA WF01
    // ==========================================

    const payload = {

      // Metadatos

      lead_id: crypto.randomUUID(),

      source: "candela-ringanapartners.com",

      partner_name: "Candela",

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

      language: "ES",

      // Dirección

      country: body.country,

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

      country_code: "ES",

      // Teléfono

      contact_type: "TELÉFONO MÓVIL",

      phone_country: "España (+34)",

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

    console.log("==================================");
    console.log("PAYLOAD WF01");
    console.log("==================================");

    console.log(JSON.stringify(payload, null, 2));

    // ==========================================
    // TODAVÍA ENVIAMOS EL BODY ORIGINAL
    // ==========================================

    const wf01Response = await fetch(
  "https://n8n.ringanaassistant.com/webhook/api/v1/lead",
  {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

    });

    const result = await wf01Response.text();

    console.log("==================================");
    console.log("RESPUESTA WF01");
    console.log("==================================");

    console.log("STATUS:", wf01Response.status);
    console.log("OK:", wf01Response.ok);
    console.log(result);

    return NextResponse.json({

      success: true,

      wf01: result,

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