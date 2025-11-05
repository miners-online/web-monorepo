import { betterAuth } from "better-auth";
import { jwt, oidcProvider, openAPI } from "better-auth/plugins";
import { Pool } from "pg";

const devOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
]

export const trustedOrigins = [
  process.env.NEXT_PUBLIC_HOME_URL as string,
  "https://app.minersonline.uk",
  ...(process.env.NODE_ENV !== "production" ? devOrigins : []),
];

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  trustedOrigins: trustedOrigins,
  socialProviders: { 
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  disabledPaths: [
    "/token", // disabled for oAuth compliance
  ],
  plugins: [ 
    jwt({
      disableSettingJwtHeader: true, // disabled for oAuth compliance
    }),
    oidcProvider({
      useJWTPlugin: true,
      loginPage: "/sign-in",
    }),
    openAPI({
      disableDefaultReference: process.env.NODE_ENV === "production",
    }),
  ] 
});