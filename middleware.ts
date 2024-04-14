import { type NextRequest, NextResponse, userAgent } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  const hasPrefixSp = pathname.startsWith('/sp');
  const hasPrefixPc = pathname.startsWith('/pc');
  const hasPrefixSpOrPc = hasPrefixSp || hasPrefixPc;

  if (!hasPrefixSpOrPc && viewport === 'mobile') {
    return NextResponse.redirect(new URL('/sp', request.url));
  }

  if (!hasPrefixSpOrPc && viewport === 'desktop') {
    return NextResponse.redirect(new URL('/pc', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
