import { LoginForm } from '@/app/components/login-form';

export default function Home() {
  return (
    <main className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-black via-gray-900 to-black bg-no-repeat bg-center bg-cover">
      <h1 className="font-[Impact] font-bold text-pink-500 text-[8rem] tracking-wide">
        FIGHT CLUB
      </h1>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
