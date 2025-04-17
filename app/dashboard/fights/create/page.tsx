import Form from '@/app/components/fights/create-form';
import Breadcrumbs from '@/app/components/fighters/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { unauthorized } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create Fight',
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
          { label: 'Fights', href: '/dashboard/fights' },
          {
            label: 'Create Fight',
            href: '/dashboard/fights/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
