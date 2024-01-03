import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs';

export default function UpdateEvent() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <section>
      <h3 className="font-bold">Update Event</h3>
      <div className="mt-4">
        <EventForm
          userId={userId}
          type="Update"
        />
      </div>
    </section>
  );
}
