import { IEvent } from '@/lib/models/event.model';
import Link from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import moment from 'moment';
import { auth } from '@clerk/nextjs';
import { ArrowRightIcon, Pencil2Icon } from '@radix-ui/react-icons';
import DeleteConfirmation from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

export default function Card({ event, hasOrderLink, hidePrice }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="flex flex-col relative w-full shadow-sm rounded-md overflow-hidden hover:shadow-lg hover:border-accent cursor-pointer">
      <Link href={`/events/${event._id}`}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={event.imageUrl}
            alt={event.title}
            className="object-cover rounded-t-md aspect-video"
            fill
          />
        </AspectRatio>
      </Link>

      {isEventCreator && !hidePrice && (
        <div className="absolute top-2 right-2 flex flex-col gap-4 rounded-md bg-white p-1.5 shadow-sm transition-all">
          <Link
            href={`/events/${event._id}/update`}
            className="cursor-pointer"
          >
            <Pencil2Icon className="w-5 h-5 hover:text-muted-foreground" />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex flex-col p-4">
        <div className="flex gap-2 items-center mb-2">
          {!hidePrice && (
            <p className="truncate flex items-center justify-center px-3 h-8 text-xs rounded-md font-bold bg-primary text-primary-foreground shadow hover:bg-primary/90">
              {event.isFree === true ? 'FREE' : `$${event.price}`}
            </p>
          )}
          <p className="truncate flex items-center justify-center px-3 h-8 text-xs rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
            {event.category.name}
          </p>
        </div>
        <p className="text-sm mb-2 text-muted-foreground">
          {moment(event.startDateTime).format('ddd, MMM D, h:mm A')}
        </p>
        <h3 className="font-bold text-xl mb-6 line-clamp-2">{event.title}</h3>
        <div className="flex gap-2 justify-between items-center">
          <p className="font-medium text-sm text-muted-foreground">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="flex gap-2 items-center"
            >
              <p className="text-sm">Order Details</p>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
