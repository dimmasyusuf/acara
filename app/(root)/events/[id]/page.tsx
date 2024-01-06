import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  getEventById,
  getRelatedEventsByCategory,
} from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import moment from 'moment';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Collection from '@/components/shared/Collection';

export default async function EventDetails({
  params: { id },
  searchParams,
}: SearchParamProps) {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <section className="flex flex-col max-w-screen-lg mx-auto">
      <AspectRatio
        ratio={16 / 9}
        className="mb-6"
      >
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover rounded-md"
        />
      </AspectRatio>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 mb-8">
        <div className="flex flex-col col-span-2">
          <p className="flex items-center justify-center px-3 h-8 text-xs rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 w-fit mb-2">
            {event.category.name}
          </p>
          <h1 className="font-bold text-4xl sm:text-5xl mb-4">{event.title}</h1>

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

        <div className="fixed overflow-hidden left-0 bottom-0 z-10 w-full shadow md:static md:flex md:flex-col">
          <div className="bg-primary-foreground flex flex-col gap-4 items-center justify-center p-4 md:border md:border-input md:rounded-md md:mt-12">
            <p className="font-bold">
              {event.isFree === true ? 'FREE' : `$${event.price}`}
            </p>
            <Button
              size="lg"
              className="w-full"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full mb-28 md:mb-0">
        <h3 className="font-bold text-2xl mb-4">Related Events</h3>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </div>
    </section>
  );
}
