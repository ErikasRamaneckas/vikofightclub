import { Metadata } from 'next';
import FightsTable from '@/app/components/fights/table';
import { fetchFightsPages } from '@/app/lib/data';
import Pagination from '@/app/components/fighters/pagination';
import Search from '@/app/components/search';
import { CreateFight } from '@/app/components/fights/buttons';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Fights',
};

export default async function FightsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
  }>;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || 'date-desc';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchFightsPages(query);
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4">Fights</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search fighters..." />
        {isAdmin && <CreateFight />}
      </div>
      <FightsTable
        query={query}
        currentPage={currentPage}
        sort={sort}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
