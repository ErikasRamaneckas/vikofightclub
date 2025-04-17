import { fetchFights } from '@/app/lib/data';
import { FighterInFight } from '@/app/lib/definitions';

export default async function FightsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const fights = await fetchFights(currentPage, query);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {fights?.map((fight) => (
              <div
                key={fight.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <p className="text-sm text-gray-500">
                    {new Date(fight.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {fight.location}
                  </p>
                </div>
                <ul className="mt-2 space-y-1 text-sm">
                  {fight.fighters.map((fighter: FighterInFight) => (
                    <li
                      key={fighter.id}
                      className={`flex justify-between rounded px-2 py-1 ${
                        fighter.result === 'win'
                          ? 'bg-green-100'
                          : fighter.result === 'loss'
                          ? 'bg-red-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <span>{fighter.name}</span>
                      <span className="capitalize text-gray-700">
                        {fighter.result || 'n/a'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-3 py-5 font-medium">Date</th>
                <th className="px-3 py-5 font-medium">Location</th>
                <th className="px-3 py-5 font-medium">Fighters</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {fights?.map((fight) => (
                <tr
                  key={fight.id}
                  className="border-b last-of-type:border-none"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(fight.date).toLocaleString()}
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
                                ? 'bg-green-100'
                                : fighter.result === 'loss'
                                ? 'bg-red-100'
                                : 'bg-gray-100'
                            }`}
                          >
                            <span>{fighter.name}</span>
                            <span className="capitalize text-gray-700">
                              {fighter.result || 'n/a'}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
