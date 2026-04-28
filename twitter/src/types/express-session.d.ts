import "express-session";

declare module "express-session" {
  interface SessionData {
    authorizedResetId?: number | null; // Add your custom property here

    lastSentOtp?: {
        code: string;
        email: string;
        time: string;
    } | null;

    user?: {
      id: number;
      username: string;
      email?: string;
    };
  }
}

