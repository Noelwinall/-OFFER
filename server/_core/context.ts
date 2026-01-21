import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

/**
 * Create a synthetic admin user for API key authentication.
 * This bypasses OAuth for testing/admin purposes.
 */
function createApiKeyUser(): User {
  return {
    id: 0,
    openId: "api-key-admin",
    name: "API Key Admin",
    email: "admin@api-key.local",
    loginMethod: "api-key",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  let user: User | null = null;

  // Check for API Key authentication first (X-API-Key header)
  const apiKey = opts.req.headers["x-api-key"];
  if (apiKey && ENV.adminApiKey && apiKey === ENV.adminApiKey) {
    user = createApiKeyUser();
    return {
      req: opts.req,
      res: opts.res,
      user,
    };
  }

  // Fall back to OAuth authentication
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
