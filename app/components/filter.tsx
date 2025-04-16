'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function WeightClassFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentWeightClass = searchParams.get('weightClass') || '';

  const handleWeightClassChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newWeightClass = e.target.value;
      const params = new URLSearchParams(searchParams.toString());

      if (newWeightClass) {
        params.set('weightClass', newWeightClass);
      } else {
        params.delete('weightClass');
      }

      params.set('page', '1');

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <select
      name="weightClass"
      className="rounded-md border p-2"
      value={currentWeightClass}
      onChange={handleWeightClassChange}
    >
      <option value="">All Weight Classes</option>
      <option value="light">Light (&lt; 70kg)</option>
      <option value="middle">Middle (71-85kg)</option>
      <option value="heavy">Heavy (85kg+)</option>
    </select>
  );
}
