import { Button } from '../../ui/Button';

const LiveMeetingControl = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button variant="secondary">Pause</Button>
      <Button variant="primary" size="lg">
        Start / Next
      </Button>
      <Button variant="danger">End Meeting</Button>
    </div>
  );
};

export default LiveMeetingControl;