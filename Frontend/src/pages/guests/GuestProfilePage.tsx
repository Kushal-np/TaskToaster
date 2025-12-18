import { useParams } from 'react-router-dom';

const GuestProfilePage = () => {
  const { guestId } = useParams();
  // Fetch guest data based on guestId

  return (
    <div>
      <h1 className="text-3xl font-bold">Guest Profile</h1>
      <p>Viewing profile for Guest ID: {guestId}</p>
    </div>
  );
};

export default GuestProfilePage;