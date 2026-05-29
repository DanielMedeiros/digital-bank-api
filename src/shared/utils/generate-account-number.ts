export function generateAccountNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);

  return `260-${random}`;
}
