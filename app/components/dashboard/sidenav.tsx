import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { ModeToggle } from '../menu-toggle';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white dark:bg-gray-900">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-pink-500 p-4 md:h-40"
        href="/dashboard"
      >
        <Image
          src="/FightClubSoapLogo.webp"
          width={200}
          height={200}
          alt="Desktop Soap Logo of Fight Club"
          className="hidden md:block"
        />
        <Image
          src="/FightClubSoapLogo.webp"
          width={80}
          height={80}
          alt="Mobile Soap Logo of Fight Club"
          className="block md:hidden"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-800 md:block"></div>
        <div className="flex justify-center md:justify-start items-center">
          <ModeToggle />
        </div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900 dark:hover:text-pink-300 md:flex-none md:justify-start md:p-2 md:px-3">
            <LogOut />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
