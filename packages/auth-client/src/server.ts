import { betterAuth } from "better-auth";
import {
  jwt,
  oidcProvider,
  openAPI
} from "better-auth/plugins"

interface MakeAuthOptions {
  database: any;
  socialProviders?: {
    [key: string]: {
      clientId: string;
      clientSecret: string;
    }
  }
}

const isProduction = process.env.NODE_ENV === "production";
export const trustedOrigins = isProduction ? [
  "https://*.minersonline.uk",
] : [
  "http://localhost:*",
];

export type AuthServerInstance = ReturnType<typeof betterAuth>;

export function makeAuth(options: MakeAuthOptions): AuthServerInstance {
  const auth = betterAuth({
    database: options.database,
    emailAndPassword: { 
      enabled: true, 
    },
    trustedOrigins: trustedOrigins,
    disabledPaths: [
      "/token", // must disable the jwt token endpoint when using oidc
    ],
    plugins: [ 
      jwt({
        jwks: {
          keyPairConfig: {
            alg: "RS256"
          }
        },
        disableSettingJwtHeader: true, // we are using oidc for auth, so disable the jwt auth strategy
      }),
      oidcProvider({
        useJWTPlugin: true,
        loginPage: "/sign-in",
      }),
      openAPI({
        disableDefaultReference: isProduction,
      }),
    ],
    socialProviders: options.socialProviders,
    advanced: {
      defaultCookieAttributes: {
        domain: isProduction ? ".minersonline.uk" : undefined,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        httpOnly: true,
      }
    }
  })
  return auth;
}