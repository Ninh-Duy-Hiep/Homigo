import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/login', '/register', '/about', '/rooms'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
}