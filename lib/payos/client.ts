import { PayOS } from "@payos/node";

export function isPayosConfigured(): boolean {
  return Boolean(
    process.env.PAYOS_CLIENT_ID &&
      process.env.PAYOS_API_KEY &&
      process.env.PAYOS_CHECKSUM_KEY,
  );
}

export function getPayosClient(): PayOS | null {
  const clientId = process.env.PAYOS_CLIENT_ID;
  const apiKey = process.env.PAYOS_API_KEY;
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

  if (!clientId || !apiKey || !checksumKey) return null;

  return new PayOS({ clientId, apiKey, checksumKey });
}

/** PayOS orderCode must be a positive integer. */
export function createOrderCode(): number {
  return Number(`${Date.now()}${Math.floor(Math.random() * 100)}`.slice(-12));
}
