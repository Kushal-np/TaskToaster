import Input, { type InputProps } from './Input';

const TimePicker = (props: InputProps) => {
  return (
    <Input
      type="time"
      {...props}
    />
  );
};

export default TimePicker;