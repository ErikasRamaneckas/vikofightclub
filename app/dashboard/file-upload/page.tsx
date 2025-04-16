import Uploader from '@/app/components/file-upload/uploader';
import { auth } from '@/auth';
import { unauthorized } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';
  if (!isAdmin) {
    unauthorized();
  }
  return (
    <div className="max-w-md mx-auto w-full">
      <Toaster />
      <Uploader />
    </div>
  );
}
