export function calculateAge(): number {
  const birth = new Date(2003, 4, 30)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()

  if (
    (birth.getMonth() === now.getMonth() && birth.getDay() !== now.getDay()) ||
    birth.getMonth() > now.getMonth()
  ) {
    age--
  }
  return age
}
