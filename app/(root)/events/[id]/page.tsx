import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { getEventById } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default async function EventDetails({
  params: { id },
}: SearchParamProps) {
  const event = await getEventById(id);

  return (
    <section className="flex flex-col max-w-screen-lg mx-auto">
      <AspectRatio
        ratio={16 / 9}
        className="mb-8"
      >
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover rounded-md"
        />
      </AspectRatio>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col col-span-2">
          <p className="text-lg mb-2">
            {moment(event.startDateTime).format('LL')}
          </p>
          <h1 className="font-bold text-4xl sm:text-5xl mb-4">{event.title}</h1>
          <div className="flex gap-4 mb-4 items-center overflow-hidden">
            <p className="truncate flex items-center justify-center px-4 py-2 rounded-md font-bold bg-primary text-primary-foreground shadow hover:bg-primary/90">
              {event.isFree === true ? 'FREE' : `$${event.price}`}
            </p>
            <p className="truncate flex items-center justify-center px-4 py-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
              {event.category.name}
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 border border-input rounded-md w-full mb-6">
            <Avatar className="rounded-md w-12 h-12">
              <AvatarImage
                src={event.organizer.photo}
                alt={`${event.organizer.firstName} ${event.organizer.lastName}`}
              />
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <p className="text-muted-foreground">
                By{' '}
                <span className="truncate font-medium text-primary">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {event.organizer.email}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="mb-8"
          >
            Book Now
          </Button>

          <div className="flex flex-col mb-6">
            <h2 className="font-bold text-xl">Date and time</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-9 w-9">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <p className="font-medium text-sm">
                {moment(event.startDateTime).format('llll')} -{' '}
                {moment(event.endDateTime).format('l') ===
                  moment(event.startDateTime).format('l') &&
                  moment(event.endDateTime).format('LT')}
              </p>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <h2 className="font-bold text-xl">Location</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-9 w-9">
                <FaLocationDot className="w-5 h-5" />
              </div>
              <p className="font-medium text-sm">{event.location}</p>
            </div>
          </div>

          <p className="mb-4">{event.description}</p>
        </div>
      </div>
    </section>
  );
}
