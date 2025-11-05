import { createAuthClient } from "better-auth/react"
import { jwtClient, oidcClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [
    jwtClient(),
    oidcClient()
  ]
})

export const { signIn, signUp, useSession } = authClient