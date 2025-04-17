import EditFightForm from '@/app/components/fights/edit-form';
import Breadcrumbs from '@/app/components/fighters/breadcrumbs';
import {
  fetchFightById,
  fetchFighterById,
  fetchFighters,
} from '@/app/lib/data';
import { notFound, unauthorized } from 'next/navigation';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Edit Fight',
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
  const fight = await fetchFightById(params.id);
  const fighters = await fetchFighters();

  if (!fight) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fights', href: '/dashboard/fights' },
          {
            label: 'Edit Fight',
            href: `/dashboard/fights/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditFightForm fight={fight} fighters={fighters} />
    </main>
  );
}
