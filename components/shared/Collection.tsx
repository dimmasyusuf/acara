import { IEvent } from '@/lib/models/event.model';
import Card from './Card';

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events';
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

export default function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) {
  return (
    <>
      {data.length >= 1 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((event) => {
              const hasOrderLink = collectionType == 'Events_Organized';
              const hidePrice = collectionType == 'My_Tickets';

              return (
                <li
                  key={event._id}
                  className="flex justify-center"
                >
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center h-64">
          <h3 className="font-bold text-xl">{emptyTitle}</h3>
          <p className="font-medium text-sm">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
}
