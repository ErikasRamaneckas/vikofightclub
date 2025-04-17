'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { createFight, FightState } from '@/app/lib/actions';
import { users } from '@/app/lib/placeholder-data'; // Update as needed
import { Calendar, MapPin } from 'lucide-react';

export default function CreateFightForm() {
  const initialState: FightState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    createFight,
    initialState
  );

  const [fighter1, setFighter1] = useState('');
  const [fighter2, setFighter2] = useState('');
  const [winner, setWinner] = useState('');
  const fightersInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fighter1 || !fighter2) return;

    let results = [
      { fighter_id: fighter1, result: 'loss' },
      { fighter_id: fighter2, result: 'loss' },
    ];

    if (winner === 'draw') {
      results = results.map((r) => ({ ...r, result: 'draw' }));
    } else if (winner === fighter1) {
      results = [
        { fighter_id: fighter1, result: 'win' },
        { fighter_id: fighter2, result: 'loss' },
      ];
    } else if (winner === fighter2) {
      results = [
        { fighter_id: fighter1, result: 'loss' },
        { fighter_id: fighter2, result: 'win' },
      ];
    }

    if (fightersInputRef.current) {
      fightersInputRef.current.value = JSON.stringify(results);
    }
  }, [fighter1, fighter2, winner]);

  const handleFighter1Change = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFighter1(e.target.value);
    if (e.target.value === fighter2) setFighter2('');
  };

  const handleFighter2Change = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFighter2(e.target.value);
    if (e.target.value === fighter1) setFighter1('');
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 dark:bg-gray-900 p-4 md:p-6 space-y-6">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="e.g., Basement"
              className="peer w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-2"
            />
            <MapPin className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Date
          </label>
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              required
              className="peer w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-2"
            />
            <Calendar className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        <div>
          <label
            htmlFor="fighter1"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Fighter 1
          </label>
          <select
            id="fighter1"
            name="fighter1"
            required
            value={fighter1}
            onChange={handleFighter1Change}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="">Select fighter</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="fighter2"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Fighter 2
          </label>
          <select
            id="fighter2"
            name="fighter2"
            required
            value={fighter2}
            onChange={handleFighter2Change}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="">Select fighter</option>
            {users
              .filter((user) => user.id !== fighter1)
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="winner"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Winner
          </label>
          <select
            id="winner"
            name="winner"
            required
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="">Select winner</option>
            {users
              .filter(
                (user) => user.id === fighter1 || user.id === fighter2
              )
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            <option value="draw">Draw</option>
          </select>
        </div>
      </div>

      <input type="hidden" name="fighters" ref={fightersInputRef} />

      <div className="mt-6 flex justify-end gap-4">
        <a
          href="/dashboard/fights"
          className="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-800 px-4 text-sm font-medium text-gray-600 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="h-10 rounded-lg bg-pink-600 px-4 text-sm font-medium text-white transition hover:bg-pink-400"
        >
          Create Fight
        </button>
      </div>
    </form>
  );
}
