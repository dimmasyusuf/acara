import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-start bg-black w-fit rounded-md pb-0.5 pr-0.5 hover:bg-white"
        >
          <h1 className="bg-white border-black border-2 rounded-md px-3 py-1 font-mono font-bold text-2xl hover:bg-black hover:text-white">
            acara
          </h1>
        </Link>
        <div className="flex gap-2">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: '40px',
                    height: '40px',
                  },
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}