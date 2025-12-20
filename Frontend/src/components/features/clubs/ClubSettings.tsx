// src/components/features/clubs/ClubSettings.tsx
import type { IClub, ICreateClubRequest } from '../../../types';
import ClubForm from './ClubForm';

interface ClubSettingsProps {
  club: IClub;
  onSubmit: (data: ICreateClubRequest) => void;
  isLoading?: boolean;
}

const ClubSettings = ({ club, onSubmit, isLoading }: ClubSettingsProps) => {
  return (
    <div>
      <ClubForm 
        defaultValues={{
          clubName: club.clubName,
          clubNumber: club.clubNumber,
          region: club.region,
          district: club.district,
          division: club.division,
          area: club.area,
          charteredDate: club.charteredDate.split('T')[0] // Format date for input
        }}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ClubSettings;