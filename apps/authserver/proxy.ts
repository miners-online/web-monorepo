import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { trustedOrigins } from "@repo/auth-client/server";

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {  
    const res = NextResponse.next()

    const origin = req.headers.get('origin')
    if (origin && trustedOrigins.includes(origin)) {
      res.headers.append('Access-Control-Allow-Origin', origin)
      res.headers.append('Access-Control-Allow-Credentials', 'true')
    }
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS')
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: res.headers })
    }

    return res
  } 
}

export const config = {
  matcher: ['/api/:path*'],
};