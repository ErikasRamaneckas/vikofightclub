import { Metadata } from 'next';
import FightsTable from '@/app/components/fights/table';
import { fetchFightsPages } from '@/app/lib/data';
import Pagination from '@/app/components/fighters/pagination';
import Search from '@/app/components/search';

export const metadata: Metadata = {
  title: 'Fights',
};

export default async function FightsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchFightsPages(query);
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4">Fights</h1>
      <Search placeholder="Search by fighter name" />
      <FightsTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
