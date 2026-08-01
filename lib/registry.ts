import { promises as fs } from "fs";
import path from "path";

type PartnerRegistry = {
  version: number;
  enabled: boolean;

  partner: {
    code: string;
    name: string;
  };

  assistant: {
    subdomain: string;
    market: string;
    language: string;
    locale: string;
    environment: string;
  };

  ringana: {
    location: string;
    credential: string;
  };

  notifications: {
    whatsapp: string;
  };
};

export function resolvePartnerCode(
  hostname: string
): string {

  const normalizedHostname = hostname
    .trim()
    .toLowerCase()
    .split(":")[0];

  const isLocalhost =
    normalizedHostname === "localhost" ||
    normalizedHostname === "127.0.0.1";

  if (isLocalhost) {

    const localPartnerCode =
      process.env.LOCAL_PARTNER_CODE?.trim();

    if (!localPartnerCode) {
      throw new Error(
        "LOCAL_PARTNER_CODE no configurado"
      );
    }

    if (!/^\d{7,8}$/.test(localPartnerCode)) {
      throw new Error(
        `LOCAL_PARTNER_CODE invalido: ${localPartnerCode}`
      );
    }

    return localPartnerCode;

  }

  const subdomain =
    normalizedHostname.split(".")[0];

  const match =
    subdomain.match(/(\d{7,8})$/);

  if (!match) {
    throw new Error(
      `No se puede resolver el Partner desde el hostname: ${hostname}`
    );
  }

  return match[1];

}

function assertNonEmptyString(
  value: unknown,
  fieldName: string,
  partnerCode: string
): asserts value is string {

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Registry del Partner ${partnerCode}: campo obligatorio invalido: ${fieldName}`
    );
  }

}

function validatePartnerRegistry(
  registry: unknown,
  partnerCode: string
): asserts registry is PartnerRegistry {

  if (
    typeof registry !== "object" ||
    registry === null ||
    Array.isArray(registry)
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: estructura principal invalida`
    );
  }

  const data = registry as Record<string, unknown>;

  if (
    typeof data.version !== "number" ||
    !Number.isInteger(data.version) ||
    data.version < 1
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: version invalida`
    );
  }

  if (typeof data.enabled !== "boolean") {
    throw new Error(
      `Registry del Partner ${partnerCode}: enabled debe ser boolean`
    );
  }

  if (data.enabled !== true) {
    throw new Error(
      `Partner ${partnerCode} deshabilitado`
    );
  }

  if (
    typeof data.partner !== "object" ||
    data.partner === null ||
    Array.isArray(data.partner)
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: bloque partner invalido`
    );
  }

  const partner = data.partner as Record<string, unknown>;

  assertNonEmptyString(
    partner.code,
    "partner.code",
    partnerCode
  );

  assertNonEmptyString(
    partner.name,
    "partner.name",
    partnerCode
  );

  if (partner.code !== partnerCode) {
    throw new Error(
      `Registry del Partner ${partnerCode}: partner.code no coincide con el nombre del archivo`
    );
  }

  if (
    typeof data.assistant !== "object" ||
    data.assistant === null ||
    Array.isArray(data.assistant)
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: bloque assistant invalido`
    );
  }

  const assistant = data.assistant as Record<string, unknown>;

  assertNonEmptyString(
    assistant.subdomain,
    "assistant.subdomain",
    partnerCode
  );

  assertNonEmptyString(
    assistant.market,
    "assistant.market",
    partnerCode
  );

  assertNonEmptyString(
    assistant.language,
    "assistant.language",
    partnerCode
  );

  assertNonEmptyString(
    assistant.locale,
    "assistant.locale",
    partnerCode
  );

  assertNonEmptyString(
    assistant.environment,
    "assistant.environment",
    partnerCode
  );

  if (
    typeof data.ringana !== "object" ||
    data.ringana === null ||
    Array.isArray(data.ringana)
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: bloque ringana invalido`
    );
  }

  const ringana = data.ringana as Record<string, unknown>;

  assertNonEmptyString(
    ringana.location,
    "ringana.location",
    partnerCode
  );

  assertNonEmptyString(
    ringana.credential,
    "ringana.credential",
    partnerCode
  );

  if (
    typeof data.notifications !== "object" ||
    data.notifications === null ||
    Array.isArray(data.notifications)
  ) {
    throw new Error(
      `Registry del Partner ${partnerCode}: bloque notifications invalido`
    );
  }

  const notifications =
    data.notifications as Record<string, unknown>;

  assertNonEmptyString(
    notifications.whatsapp,
    "notifications.whatsapp",
    partnerCode
  );

}

export async function getPartner(
  partnerCode: string
): Promise<PartnerRegistry> {

  const normalizedPartnerCode = partnerCode?.trim();

  if (!normalizedPartnerCode) {
    throw new Error("Partner code no especificado");
  }

  if (!/^\d{7,8}$/.test(normalizedPartnerCode)) {
    throw new Error(
      `Partner code invalido: ${normalizedPartnerCode}`
    );
  }

  const filePath = path.join(
    process.cwd(),
    "registry",
    "partners",
    `${normalizedPartnerCode}.json`
  );

  let file: string;

  try {

    file = await fs.readFile(filePath, "utf8");

  } catch {

    throw new Error(
      `Registry del Partner ${normalizedPartnerCode} no encontrado`
    );

  }

  let registry: unknown;

  try {

    registry = JSON.parse(file);

  } catch {

    throw new Error(
      `Registry del Partner ${normalizedPartnerCode} contiene un JSON invalido`
    );

  }

  validatePartnerRegistry(
    registry,
    normalizedPartnerCode
  );

  return registry;

}

export async function getPublicPartner(
  partnerCode: string
) {

  const partner = await getPartner(partnerCode);

  return {

    version: partner.version,

    enabled: partner.enabled,

    partner: partner.partner,

    assistant: partner.assistant

  };

}