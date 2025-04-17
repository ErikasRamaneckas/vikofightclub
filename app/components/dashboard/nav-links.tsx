'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { CircleUserRound, House, Swords, Upload } from 'lucide-react';

const links = [
  { name: 'Home', href: '/dashboard', icon: House },
  {
    name: 'Fighters',
    href: '/dashboard/fighters',
    icon: CircleUserRound,
  },
  {
    name: 'Fights',
    href: '/dashboard/fights',
    icon: Swords,
  },
  {
    name: 'File Upload',
    href: '/dashboard/file-upload',
    icon: Upload,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900 dark:hover:text-pink-300 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300':
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
