import crypto from "crypto";

const RESET_TOKEN_EXPIRY_MS = 1000 * 60 * 60;

export interface ResetTokenData {
  token: string;
  expiresAt: Date;
}

export function generateResetToken(): ResetTokenData {
  return {
    token: crypto.randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY_MS),
  };
}
