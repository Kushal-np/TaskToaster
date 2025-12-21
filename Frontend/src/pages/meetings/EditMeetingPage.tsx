// src/pages/meetings/EditMeetingPage.tsx
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,

} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useMeeting, useUpdateMeeting } from '../../hooks/useMeetings';
import { useEffect } from 'react';

interface FormData {
  theme?: string;
  meetingDate?: string;
  startTime?: string;
  venue?: string;
  venueLink?: string;
  isHybrid?: boolean;
  onlineLink?: string;
  onlineMeetingId?: string;
  onlinePasscode?: string;
  whatsappLink?: string;
  resourceLinksText?: string;
}

const EditMeetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useMeeting(id);
  const meeting = data as any; // TS-ignore for simplicity

  const { mutateAsync: updateMeeting, isPending } = useUpdateMeeting();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const isHybrid = watch('isHybrid');

  /* Reset form when meeting loads */
  useEffect(() => {
    if (!meeting) return;

    reset({
      theme: meeting.theme || '',
      meetingDate: meeting.meetingDate?.split('T')[0] || '',
      startTime: meeting.startTime || '',
      venue: meeting.venue || '',
      venueLink: meeting.venueLink || '',
      isHybrid: meeting.isHybrid ?? false,
      onlineLink: meeting.onlineLink || '',
      onlineMeetingId: meeting.onlineMeetingId || '',
      onlinePasscode: meeting.onlinePasscode || '',
      whatsappLink: meeting.whatsappLink || '',
      resourceLinksText:
        meeting.resourceLinks?.map((r: any) => r.url).join('\n') || '',
    });
  }, [meeting, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;

    // Convert textarea into array of objects with both url and name
    const resourceLinks =
      data.resourceLinksText
        ?.split('\n')
        .map(link => link.trim())
        .filter(Boolean)
        .map(link => ({ 
          url: link,
          name: link // Use the URL as the name, or extract a better name if needed
        })) || [];

    const updateData = {
      theme: data.theme,
      meetingDate: data.meetingDate,
      startTime: data.startTime,
      venue: data.venue || undefined,
      venueLink: data.venueLink || undefined,
      onlineLink: data.onlineLink || undefined,
      onlineMeetingId: data.onlineMeetingId || undefined,
      onlinePasscode: data.onlinePasscode || undefined,
      whatsappLink: data.whatsappLink || undefined,
      isHybrid: data.isHybrid ?? false,
      resourceLinks: resourceLinks.length ? resourceLinks : undefined,
    };

    try {
      await updateMeeting({ meetingId: id, meetingData: updateData });
      navigate(`/meetings/${id}`);
    } catch (err) {
      console.error('❌ Error updating meeting:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading meeting..." />
      </div>
    );
  }

if (error || !meeting) {
  return (
    <div className="max-w-md mx-auto mt-24 text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Meeting Not Found</h2>
      <p className="text-gray-600">
        The meeting you're trying to edit doesn't exist or you don't have access.
      </p>
      <Link to="/meetings">
        <Button>Back to Meetings</Button>
      </Link>
    </div>
  );
}


  return (
    <div className="max-w-4xl mx-auto py-6">
      <Link
        to={`/meetings/${id}`}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Meeting
      </Link>

      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold">Edit Meeting</h1>
          <p className="text-gray-600 mt-1">{meeting.theme}</p>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium mb-1">Meeting Theme *</label>
              <Input {...register('theme', { required: 'Theme is required' })} />
              {errors.theme && (
                <p className="text-red-500 text-sm">{errors.theme.message}</p>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input type="date" {...register('meetingDate', { required: true })} />
              <Input type="time" {...register('startTime', { required: true })} />
            </div>

            {/* Venue */}
            <Input placeholder="Venue" {...register('venue')} />
            <Input placeholder="Venue Link" type="url" {...register('venueLink')} />

            {/* Hybrid */}
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('isHybrid')} />
              <span>Hybrid Meeting</span>
            </label>

            {isHybrid && (
              <div className="space-y-3 bg-blue-50 p-4 rounded">
                <Input placeholder="Online Meeting Link" type="url" {...register('onlineLink')} />
                <Input placeholder="Meeting ID" {...register('onlineMeetingId')} />
                <Input placeholder="Passcode" {...register('onlinePasscode')} />
              </div>
            )}

            {/* Communication */}
            <Input placeholder="WhatsApp Group Link" type="url" {...register('whatsappLink')} />

            {/* Resource Links */}
            <Textarea
              rows={4}
              placeholder="Resource links (one per line)"
              {...register('resourceLinksText')}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Link to={`/meetings/${id}`}>
                <Button >Cancel</Button>
              </Link>
              <Button type="submit" isLoading={isPending}>
                Save Changes
              </Button>
            </div>

          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditMeetingPage;