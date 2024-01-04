import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs';

export default function CreateEvent() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <section className="flex flex-col max-w-screen-lg mx-auto">
      <h3 className="font-bold text-4xl text-center">Create Event</h3>
      <div className="mt-8">
        <EventForm
          userId={userId}
          type="Create"
        />
      </div>
    </section>
  );
}
