import { LogtoNextConfig, UserScope } from "@logto/next";

export const getAuthClientConfig = (): LogtoNextConfig => {
  return {
    appId: process.env.LOGTO_APP_ID!,
    appSecret: process.env.LOGTO_APP_SECRET!,
    endpoint: process.env.LOGTO_ENDPOINT!,
    cookieSecure: process.env.NODE_ENV === "production",
    baseUrl: process.env.LOGTO_BASE_URL!,
    cookieSecret: process.env.LOGTO_COOKIE_SECRET,
    scopes: [UserScope.Profile, UserScope.Email],
  };
}