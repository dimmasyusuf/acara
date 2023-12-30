'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import NavItems from './NavItems';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';

export default function MobileNav() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger className="flex sm:hidden">
        <HamburgerMenuIcon className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="flex gap-2 mt-6">
          {isSignedIn && (
            <>
              <div className="flex gap-3 items-center w-full">
                <Avatar className="w-11 h-11">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <div className="flex flex-col items-start overflow-hidden w-full">
                  <p className="text-sm font-medium truncate text-left w-full">
                    {user?.fullName}
                  </p>
                  <p className="text text-xs text-left truncate text-muted-foreground w-full">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </div>
              <Separator />
            </>
          )}
          <NavItems />
        </SheetHeader>
        <SheetFooter>
          <SignedIn>
            <Button
              size="lg"
              onClick={() => signOut(() => router.push('/'))}
              className="w-full"
            >
              Sign out
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              size="lg"
              className="w-full"
              asChild
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
