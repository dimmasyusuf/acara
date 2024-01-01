'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col sm:flex-row gap-4">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li key={link.route}>
            <Button
              variant="ghost"
              size="lg"
              className={`${
                isActive && 'font-bold'
              } "w-full justify-start pl-2 sm:px-3"`}
              asChild
            >
              <Link href={link.route}>{link.label}</Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
