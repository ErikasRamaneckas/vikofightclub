import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  const rules = [
    'YOU DO NOT TALK ABOUT FIGHT CLUB',
    'DO NOT TALK ABOUT FIGHT CLUB!',
    'IF SOMEONE YELLS "STOP", GOES LIMP OR TAPS OUT, THE FIGHT IS OVER',
    'ONLY TWO GUYS TO A FIGHT',
    'ONE FIGHT AT A TIME',
    'THE FIGHTS ARE BAREKNUCKLE NO SHIRT, NO SHOES, NO WEAPONS',
    'FIGHTS WILL GO ON AS LONG AS THEY HAVE TO',
    'IF THIS IS YOUR FIRST NIGHT AT FIGHT CLUB, YOU HAVE TO FIGHT!',
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
        WELCOME TO <span className="text-pink-600">FIGHT CLUB</span>,{' '}
        {session?.user?.name || 'CHAMPION'}
      </h1>

      <div className="w-full max-w-2xl">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center mb-4">
            <span className="text-4xl md:text-5xl font-bold mr-4">
              #{index + 1}
            </span>
            <div className="bg-pink-600 text-white text-lg md:text-xl font-bold uppercase p-2 flex-1 text-center">
              {rule}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
