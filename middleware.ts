
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/routes/register','/routes/create_survey','/routes/show_surveys','/routes/take_surveys','/routes/level1','/routes/level2','/routes/level3','/']
const AuthRoutes = ['/routes/login']

export async function middleware(req: NextRequest) {
  try {
    const response = NextResponse.next();

    const sessionToken = req.cookies.get('next-auth.session-token');

    if (!sessionToken && protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteURL = new URL("routes/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (sessionToken && AuthRoutes.includes(req.nextUrl.pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        res: error?.toString(),
      },
      {
        status: 403,
      }
    );
  }
}
