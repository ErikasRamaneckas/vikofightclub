import Form from '@/app/components/fighters/edit-form';
import Breadcrumbs from '@/app/components/fighters/breadcrumbs';
import { fetchFighterById } from '@/app/lib/data';
import { notFound, unauthorized } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Edit Fighter',
};

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  if (!isAdmin) {
    unauthorized();
  }
  const params = await props.params;
  const id = params.id;
  const [fighter] = await Promise.all([fetchFighterById(id)]);

  if (!fighter) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fighters', href: '/dashboard/fighters' },
          {
            label: 'Edit Fighter',
            href: `/dashboard/fighters/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form fighter={fighter} />
    </main>
  );
}
