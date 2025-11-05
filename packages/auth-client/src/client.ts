import { createAuthClient } from "better-auth/react";
import { jwtClient, oidcClient } from "better-auth/client/plugins"

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "https://account.minersonline.uk" : "http://localhost:4000";

export type AuthClientInstance = ReturnType<typeof createAuthClient>;

export const authClient: AuthClientInstance = createAuthClient({
  baseURL,
  plugins: [
    jwtClient(),
    oidcClient()
  ]
});

export const signIn: AuthClientInstance["signIn"] = authClient.signIn;
export const signUp: AuthClientInstance["signUp"] = authClient.signUp;
export const useSession: AuthClientInstance["useSession"] = authClient.useSession;