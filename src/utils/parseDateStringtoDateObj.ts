export function parseYYYYMMDDtoDateObjc(date: string) {
  const [year, month, day] = date.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function parseDateObjcToDDMMYYYY(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function parseYYYYMMDDtoDDMMYYYY(date: string) {
  return parseDateObjcToDDMMYYYY(parseYYYYMMDDtoDateObjc(date));
}
