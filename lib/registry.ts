import { promises as fs } from "fs";
import path from "path";

export async function getPartner(partnerCode: string) {

  const filePath = path.join(
    process.cwd(),
    "registry",
    "partners",
    `${partnerCode}.json`
  );

  const file = await fs.readFile(filePath, "utf8");

  return JSON.parse(file);

}

export async function getPublicPartner(partnerCode: string) {

  const partner = await getPartner(partnerCode);

  return {

    version: partner.version,

    enabled: partner.enabled,

    partner: partner.partner,

    assistant: partner.assistant

  };

}