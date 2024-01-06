import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mb-8">
      <div className="flex justify-center items-center order-2 md:order-1">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center md:text-left mb-2 sm:mb-4 w-full">
            Discover Events <br />
            and Meetups.
          </h1>
          <p className="text-center md:text-left text-muted-foreground lg:text-lg mb-4 sm:mb-6 w-full">
            Find interesting events that you can attend,
            <br />
            meet new people and friends.
          </p>
          <Button
            size="lg"
            className="w-full"
            asChild
          >
            <Link href="/">Explore Now</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-end order-1 md:order-2">
        <Image
          src="/images/hero.png"
          width={448}
          height={448}
          alt="event"
        />
      </div>
    </section>
  );
}
