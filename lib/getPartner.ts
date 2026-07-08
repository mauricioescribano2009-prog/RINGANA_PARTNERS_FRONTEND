export async function getPartner() {

  const response = await fetch("/api/partner", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el partner.");
  }

  return await response.json();

}