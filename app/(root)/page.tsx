import Collection from '@/components/shared/Collection';
import Hero from '@/components/shared/Hero';
import { getAllEvents } from '@/lib/actions/event.actions';

export default async function Home() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  return (
    <>
      <Hero />
      <section className="flex flex-col">
        <h3 className="font-bold text-2xl mb-4">Upcoming Events</h3>
        <div className="flex justify-between items-center p-4">
          <p>Search</p>
          <p>Filter</p>
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
