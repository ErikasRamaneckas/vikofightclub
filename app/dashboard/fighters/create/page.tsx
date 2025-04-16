import Form from '@/app/components/fighters/create-form';
import Breadcrumbs from '@/app/components/fighters/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Fighter',
};

export default async function Page() {
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
