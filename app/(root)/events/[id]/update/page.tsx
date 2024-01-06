import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

export default async function CreateEvent({
  params: { id },
}: UpdateEventProps) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <section className="flex flex-col max-w-screen-lg mx-auto">
      <h3 className="font-bold text-4xl text-center">Update Event</h3>
      <div className="mt-8">
        <EventForm
          userId={userId}
          event={event}
          eventId={event._id}
          type="Update"
        />
      </div>
    </section>
  );
}
