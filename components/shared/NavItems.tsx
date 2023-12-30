import { headerLinks } from '@/constants';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function NavItems() {
  return (
    <ul className="flex flex-col sm:flex-row gap-4">
      {headerLinks.map((link) => (
        <li key={link.route}>
          <Button
            variant="ghost"
            size="lg"
            className="w-full justify-start pl-2 sm:px-3"
            asChild
          >
            <Link href={link.route}>{link.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
