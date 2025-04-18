import { fetchFights } from '@/app/lib/data';
import { FighterInFight } from '@/app/lib/definitions';
import { DeleteFight, UpdateFight } from './buttons';
import { auth } from '@/auth';
import SortToggle from '../sort-toggle';

export default async function FightsTable({
  query,
  currentPage,
  sort,
}: {
  query: string;
  currentPage: number;
  sort: string;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  const fights = await fetchFights(currentPage, query, sort);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-gray-900">
          {/* Mobile View */}
          <div className="md:hidden">
            {fights?.map((fight) => (
              <div
                key={fight.id}
                className="mb-2 w-full rounded-md bg-white p-4 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(fight.date).toLocaleDateString(
                      'lt-LT',
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }
                    )}
                    <SortToggle field="date" currentSort={sort} />
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {fight.location}
                  </p>
                </div>
                <ul className="mt-2 space-y-1 text-sm">
                  {fight.fighters.map((fighter: FighterInFight) => (
                    <li
                      key={fighter.id}
                      className={`flex justify-between rounded px-2 py-1 ${
                        fighter.result === 'win'
                          ? 'bg-green-100 dark:bg-green-800/40'
                          : fighter.result === 'loss'
                          ? 'bg-red-100 dark:bg-red-800/40'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <span className="text-gray-800 dark:text-gray-100">
                        {fighter.name}
                      </span>
                      <span className="capitalize text-gray-700 dark:text-gray-300">
                        {fighter.result || 'n/a'}
                      </span>
                    </li>
                  ))}
                </ul>
                {isAdmin && (
                  <div className="flex justify-end gap-2">
                    <UpdateFight id={fight.id} />
                    <DeleteFight id={fight.id} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table dark:text-gray-100">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-3 py-5 font-medium">
                  Date <SortToggle field="date" currentSort={sort} />{' '}
                </th>
                <th className="px-3 py-5 font-medium">Location</th>
                <th className="px-3 py-5 font-medium">Fighters</th>
                <th className="px-3 py-5 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 text-sm">
              {fights?.map((fight) => (
                <tr
                  key={fight.id}
                  className="border-b last-of-type:border-none border-gray-200 dark:border-gray-700"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(fight.date).toLocaleDateString(
                      'lt-LT',
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {fight.location}
                  </td>
                  <td className="px-3 py-3">
                    <ul className="space-y-1">
                      {fight.fighters.map(
                        (fighter: FighterInFight) => (
                          <li
                            key={fighter.id}
                            className={`flex justify-between rounded px-2 py-1 ${
                              fighter.result === 'win'
                                ? 'bg-green-100 dark:bg-green-800/40'
                                : fighter.result === 'loss'
                                ? 'bg-red-100 dark:bg-red-800/40'
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                          >
                            <span className="text-gray-800 dark:text-gray-100">
                              {fighter.name}
                            </span>
                            <span className="capitalize text-gray-700 dark:text-gray-300">
                              {fighter.result || 'n/a'}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateFight id={fight.id} />
                        <DeleteFight id={fight.id} />
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
