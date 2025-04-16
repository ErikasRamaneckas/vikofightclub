import Form from '@/app/components/fighters/create-form';
import Breadcrumbs from '@/app/components/fighters/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { unauthorized } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Fighter',
};

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  if (!isAdmin) {
    unauthorized();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fighters', href: '/dashboard/fighters' },
          {
            label: 'Create Fighter',
            href: '/dashboard/fighters/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
