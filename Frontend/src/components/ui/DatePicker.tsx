import Input, { type InputProps } from './Input';

const DatePicker = (props: InputProps) => {
  return (
    <Input
      type="date"
      {...props}
    />
  );
};

export default DatePicker;