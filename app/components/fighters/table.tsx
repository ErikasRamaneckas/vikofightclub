import { fetchFilteredFighters } from '@/app/lib/data';
import Image from 'next/image';
import { DeleteFighter, UpdateFighter } from './buttons';
import { auth } from '@/auth';
import SortToggle from '../sort-toggle';

export default async function FightersTable({
  query,
  currentPage,
  sort,
  weightClass,
}: {
  query: string;
  currentPage: number;
  sort: string;
  weightClass: string;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  const fighters = await fetchFilteredFighters(
    query,
    currentPage,
    sort,
    weightClass
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {fighters?.map((fighter) => (
              <div
                key={fighter.id}
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={fighter.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${fighter.name}'s profile picture`}
                      />
                      <p className="text-gray-900 dark:text-gray-100">
                        {fighter.name}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {fighter.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {fighter.height}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {fighter.weight}
                    </p>
                  </div>
                  {isAdmin && (
                    <div className="flex justify-end gap-2">
                      <UpdateFighter id={fighter.id} />
                      <DeleteFighter id={fighter.id} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6"
                >
                  Fighter
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Height (cm)
                  <SortToggle field="height" currentSort={sort} />
                </th>
                <th
                  scope="col"
                  className="my-auto px-3 py-5 font-medium"
                >
                  Weight (kg)
                  <SortToggle field="weight" currentSort={sort} />
                </th>
                {isAdmin && <th className="py-5"></th>}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {fighters?.map((fighter) => (
                <tr
                  key={fighter.id}
                  className="w-full border-b border-gray-200 dark:border-gray-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={fighter.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${fighter.name}'s profile picture`}
                      />
                      <p>{fighter.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fighter.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fighter.height}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fighter.weight}
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateFighter id={fighter.id} />
                        <DeleteFighter id={fighter.id} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
