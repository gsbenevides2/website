export function calculeSemester() {
  const today = new Date();
  const transitionsDate = [
    new Date(2021, 11, 12),
    new Date(2022, 5, 30),
    new Date(2022, 11, 12),
    new Date(2023, 5, 30),
    new Date(2023, 11, 12),
    new Date(2024, 5, 30),
    new Date(2024, 11, 12),
    new Date(2025, 5, 30),
    new Date(2025, 11, 12),
    new Date(2026, 5, 30),
  ];

  for (let i = 0; i < transitionsDate.length; i++) {
    const transitionDate = transitionsDate[i];
    if (today < transitionDate) {
      return i + 1;
    }
  }
  return transitionsDate.length + 1;
}
