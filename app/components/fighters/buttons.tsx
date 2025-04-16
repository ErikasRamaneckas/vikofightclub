import Link from 'next/link';
import { deleteFighter } from '@/app/lib/actions';
import { Trash2 } from 'lucide-react';

export function DeleteFighter({ id }: { id: string }) {
  const deleteFighterWithId = deleteFighter.bind(null, id);

  return (
    <form action={deleteFighterWithId}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <Trash2 />
      </button>
    </form>
  );
}
