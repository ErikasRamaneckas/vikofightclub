import FightersTable from '@/app/components/fighters/table';
import { Metadata } from 'next';
import { fetchFightersPages } from '@/app/lib/data';
import Search from '@/app/components/search';
import { Suspense } from 'react';
import Pagination from '@/app/components/fighters/pagination';
import { CreateFighter } from '@/app/components/fighters/buttons';
import { FightersTableSkeleton } from '@/app/components/skeletons';
import { auth } from '@/auth';
import WeightClassFilter from '@/app/components/filter';

export const metadata: Metadata = {
  title: 'Fighters',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
    weightClass?: string;
  }>;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || 'height-desc';
  const weightClass = searchParams?.weightClass || '';

  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchFightersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Fighters</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search fighters..." />
        <WeightClassFilter />
        {isAdmin && <CreateFighter />}
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<FightersTableSkeleton />}
      >
        <FightersTable
          query={query}
          currentPage={currentPage}
          sort={sort}
          weightClass={weightClass}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
