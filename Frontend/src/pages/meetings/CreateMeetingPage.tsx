// src/pages/meetings/CreateMeetingPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, VideoCameraIcon, ChatBubbleLeftRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import type { ICreateMeetingRequest,  } from '../../types/meeting.types';
import { useClub } from '../../hooks/useClubs';
import { useCreateMeeting } from '../../hooks/useMeetings';

interface ResourceLinkInput {
  name: string;
  url: string;
}

interface FormData {
  theme: string;
  meetingDate: string;
  startTime: string;
  toastmasterOfDay?: string;
  venue?: string;
  venueLink?: string;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  isHybrid: boolean;
}

const CreateMeetingPage = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const [isHybrid, setIsHybrid] = useState(false);
  const [resourceLinks, setResourceLinks] = useState<ResourceLinkInput[]>([{ name: '', url: '' }]);
  
  const { mutateAsync: createMeeting, isPending: isLoading } = useCreateMeeting();
  const { data: club, isLoading: isLoadingClub } = useClub(clubId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isHybrid: false,
    },
  });

  const watchedIsHybrid = watch('isHybrid');

  const addResourceLink = () => {
    setResourceLinks([...resourceLinks, { name: '', url: '' }]);
  };

  const removeResourceLink = (index: number) => {
    setResourceLinks(resourceLinks.filter((_, i) => i !== index));
  };

  const updateResourceLink = (index: number, field: 'name' | 'url', value: string) => {
    const updated = [...resourceLinks];
    updated[index][field] = value;
    setResourceLinks(updated);
  };

  const onSubmit = async (data: FormData) => {
    if (!clubId) {
      console.error('No clubId provided');
      return;
    }

    try {
      // Filter out empty resource links
      const validResourceLinks = resourceLinks.filter(
        link => link.name.trim() !== '' && link.url.trim() !== ''
      );

      const meetingData: ICreateMeetingRequest = {
        clubId: clubId,
        theme: data.theme,
        meetingDate: data.meetingDate,
        startTime: data.startTime,
        toastmasterOfDay: data.toastmasterOfDay || undefined,
        venue: data.venue || undefined,
        venueLink: data.venueLink || undefined,
        onlineLink: data.onlineLink || undefined,
        onlineMeetingId: data.onlineMeetingId || undefined,
        onlinePasscode: data.onlinePasscode || undefined,
        whatsappLink: data.whatsappLink || undefined,
        resourceLinks: validResourceLinks.length > 0 ? validResourceLinks : undefined,
        isHybrid: data.isHybrid || false,
      };

      console.log('📤 Submitting meeting data:', meetingData);
      const newMeeting = await createMeeting(meetingData);
      console.log('✅ Meeting created:', newMeeting);
      navigate(`/meetings/${newMeeting._id}`);
    } catch (error: any) {
      console.error('❌ Error creating meeting:', error);
      console.error('❌ Error response:', error.response?.data);
    }
  };

  if (isLoadingClub) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading club information..." />
      </div>
    );
  }

if (!club && clubId) {
  return (
    <div className="max-w-md mx-auto mt-24 text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Club Not Found</h2>
      <p className="text-gray-600">
        The club you're trying to create a meeting for doesn't exist.
      </p>
      <Link to="/clubs">
        <Button>Back to My Clubs</Button>
      </Link>
    </div>
  );
}


  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to={clubId ? `/clubs/${clubId}` : '/clubs'}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          {club ? `Back to ${club.clubName}` : 'Back to Clubs'}
        </Link>
      </div>

      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold text-gray-900">Create New Meeting</h1>
          <p className="text-gray-600 mt-1">
            {club && `Creating meeting for ${club.clubName}`}
          </p>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Theme *
                </label>
                <Input
                  {...register('theme', { required: 'Theme is required' })}
                  error={errors.theme?.message}
                  placeholder="e.g., Leadership, Communication, Teamwork"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                    Meeting Date *
                  </label>
                  <Input
                    type="date"
                    {...register('meetingDate', { required: 'Date is required' })}
                    error={errors.meetingDate?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <ClockIcon className="h-4 w-4 inline mr-1" />
                    Start Time *
                  </label>
                  <Input
                    type="time"
                    {...register('startTime', { required: 'Start time is required' })}
                    error={errors.startTime?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toastmaster of the Day (Optional)
                </label>
                <Input
                  {...register('toastmasterOfDay')}
                  placeholder="User ID or leave empty for yourself"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to assign yourself as Toastmaster
                </p>
              </div>
            </div>

            {/* Location & Venue */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                <MapPinIcon className="h-5 w-5 inline mr-2" />
                Location & Venue
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue
                </label>
                <Input
                  {...register('venue')}
                  placeholder="e.g., Conference Room A, Cafe, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Link (Google Maps, etc.)
                </label>
                <Input
                  type="url"
                  {...register('venueLink')}
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isHybrid"
                  {...register('isHybrid')}
                  onChange={(e) => setIsHybrid(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isHybrid" className="text-sm font-medium text-gray-700">
                  <VideoCameraIcon className="h-4 w-4 inline mr-2" />
                  This is a hybrid meeting (in-person + online)
                </label>
              </div>
            </div>

            {/* Online Meeting Details */}
            {watchedIsHybrid && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">
                  <VideoCameraIcon className="h-5 w-5 inline mr-2" />
                  Online Meeting Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Online Meeting Link
                  </label>
                  <Input
                    type="url"
                    {...register('onlineLink')}
                    placeholder="https://zoom.us/j/..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting ID
                    </label>
                    <Input
                      {...register('onlineMeetingId')}
                      placeholder="e.g., 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passcode
                    </label>
                    <Input
                      {...register('onlinePasscode')}
                      placeholder="e.g., Toast123"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Communication Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                <ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />
                Communication Links
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Group Link
                </label>
                <Input
                  type="url"
                  {...register('whatsappLink')}
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Links
                </label>
                <div className="space-y-3">
                  {resourceLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Name (e.g., Meeting Documents)"
                          value={link.name}
                          onChange={(e) => updateResourceLink(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="url"
                          placeholder="URL (e.g., https://drive.google.com/...)"
                          value={link.url}
                          onChange={(e) => updateResourceLink(index, 'url', e.target.value)}
                        />
                      </div>
                      {resourceLinks.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => removeResourceLink(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    onClick={addResourceLink}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Resource Link
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add links to meeting documents, agendas, or other resources
                </p>
              </div>
            </div>

            {/* Debug Info */}
            <div className="p-4 bg-gray-50 rounded text-xs">
              <p><strong>Debug Info:</strong></p>
              <p>Club ID: {clubId || 'Not set'}</p>
              <p>Is Hybrid: {isHybrid ? 'Yes' : 'No'}</p>
              <p>Resource Links: {resourceLinks.filter(l => l.name && l.url).length} valid</p>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <Link to={clubId ? `/clubs/${clubId}` : '/clubs'}>
                <Button type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" isLoading={isLoading}>
                Create Meeting
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateMeetingPage;