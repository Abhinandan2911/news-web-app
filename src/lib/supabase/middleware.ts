import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const IS_PLACEHOLDER_SUPABASE =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('placeholder') ||
  supabaseAnonKey.includes('placeholder');

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Check demo role cookie for instant local execution
  const demoRole = request.cookies.get('demo_role')?.value;

  // Protected paths
  const isWorkspacePath = pathname.startsWith('/workspace');
  const isAdminPath = pathname.startsWith('/admin');

  // Fast-path when using placeholder Supabase credentials (zero network delay)
  if (IS_PLACEHOLDER_SUPABASE) {
    if (isWorkspacePath || isAdminPath) {
      if (!demoRole) {
        url.pathname = '/login';
        url.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(url);
      }

      if (isAdminPath && !['admin', 'editor'].includes(demoRole)) {
        url.pathname = '/workspace';
        return NextResponse.redirect(url);
      }

      if (isWorkspacePath && !['author', 'editor', 'admin'].includes(demoRole)) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }

    if ((pathname === '/login' || pathname === '/signup') && demoRole) {
      url.pathname = ['admin', 'editor'].includes(demoRole) ? '/admin' : '/workspace';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // Active Supabase credentials handling
  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isWorkspacePath || isAdminPath) {
    if (!user && !demoRole) {
      url.pathname = '/login';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    let role = demoRole || 'reader';
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role) {
        role = profile.role;
      }
    }

    if (isAdminPath && !['admin', 'editor'].includes(role)) {
      url.pathname = '/workspace';
      return NextResponse.redirect(url);
    }

    if (isWorkspacePath && !['author', 'editor', 'admin'].includes(role)) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if ((pathname === '/login' || pathname === '/signup') && (user || demoRole)) {
    const targetRole = demoRole || 'reader';
    url.pathname = ['admin', 'editor'].includes(targetRole) ? '/admin' : '/workspace';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
