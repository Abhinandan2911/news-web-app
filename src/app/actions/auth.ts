'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

const IS_PLACEHOLDER_SUPABASE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const roleOverride = formData.get('demoRole') as string;

  const role = roleOverride || (email.includes('admin') ? 'admin' : 'author');

  // Fast-path instant cookie set
  const cookieStore = await cookies();
  cookieStore.set('demo_role', role, { path: '/' });
  cookieStore.set('demo_user', JSON.stringify({ email, role }), { path: '/' });

  if (!IS_PLACEHOLDER_SUPABASE && !roleOverride) {
    try {
      const supabase = await createClient();
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch {
      // Ignore
    }
  }

  if (['admin', 'editor'].includes(role)) {
    redirect('/admin');
  } else {
    redirect('/workspace');
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const role = (formData.get('role') as string) || 'author';

  const cookieStore = await cookies();
  cookieStore.set('demo_role', role, { path: '/' });
  cookieStore.set('demo_user', JSON.stringify({ email, username, role }), { path: '/' });

  if (['admin', 'editor'].includes(role)) {
    redirect('/admin');
  } else if (role === 'author') {
    redirect('/workspace');
  } else {
    redirect('/');
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('demo_role');
  cookieStore.delete('demo_user');

  if (!IS_PLACEHOLDER_SUPABASE) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  }

  redirect('/login');
}
