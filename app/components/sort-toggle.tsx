'use client';

import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortToggle({
  field,
  currentSort,
}: {
  field: 'height' | 'weight';
  currentSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleSort = () => {
    const params = new URLSearchParams(searchParams);
    const isAsc = currentSort === `${field}-asc`;
    const newSort = isAsc ? `${field}-desc` : `${field}-asc`;
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const isActive = currentSort.startsWith(field);
  const isAsc = currentSort === `${field}-asc`;

  return (
    <button
      onClick={toggleSort}
      className={`ml-2 text-sm ${
        isActive
          ? 'text-gray-900 dark:text-gray-100'
          : 'text-gray-500 dark:text-gray-400'
      } hover:text-gray-900 dark:hover:text-gray-100`}
      aria-label={`Sort by ${field} ${
        isAsc ? 'descending' : 'ascending'
      }`}
    >
      {isActive ? (
        isAsc ? (
          <ArrowUpNarrowWide />
        ) : (
          <ArrowDownWideNarrow />
        )
      ) : (
        <ArrowDownUp />
      )}
    </button>
  );
}
