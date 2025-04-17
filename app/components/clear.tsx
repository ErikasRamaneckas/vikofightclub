'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function ClearFiltersButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    router.replace(pathname);
  };

  return (
    <button
      onClick={handleClear}
      className="text-white px-3 py-2 bg-pink-400 rounded-lg hover:bg-pink-300"
    >
      Clear
    </button>
  );
}
