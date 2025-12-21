import apiClient from '../../api/axiosConfig';
import EventList from '../../components/features/events/EventList';
import { useQuery } from '@tanstack/react-query';
import type { IEvent } from '../../types';

const MyRSVPsPage = () => {
  const { data: events, isLoading } = useQuery<IEvent[], Error>({
    queryKey: ['myRsvps'],
    queryFn: async () => {
      const res = await apiClient.get('/v1/event/my-rsvps'); // make sure backend returns { data: IEvent[] }
      return res.data.data as IEvent[];
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return <EventList events={events || []} />;
};

export default MyRSVPsPage;
