import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLink } from './services/firebase/client/links'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/l/')){
        const id = request.nextUrl.pathname.replace('/l/', '')
        try{
        const link = await getLink(id)
        return NextResponse.redirect(link.url)
        }
        catch(e:any){
          if(e?.code?.includes?.('not-found'))
            return NextResponse.redirect(new URL('/404', request.url))
          else NextResponse.redirect(new URL('/500', request.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/l/:id*',
}