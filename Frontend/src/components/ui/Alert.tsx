import { XCircleIcon, CheckCircleIcon, CircleArrowDownIcon } from 'lucide-react';

interface AlertProps {
  title: string;
  message?: string;
  variant?: 'success' | 'error' | 'info';
}

const Alert = ({ title, message, variant = 'info' }: AlertProps) => {
  const variantConfig = {
    success: { icon: CheckCircleIcon, color: 'green' },
    error: { icon: XCircleIcon, color: 'red' },
    info: { icon: CircleArrowDownIcon, color: 'blue' },
  };

  const { icon: Icon, color } = variantConfig[variant];

  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0"><Icon className={`h-5 w-5 text-${color}-400`} /></div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-800`}>{title}</h3>
          {message && <div className={`mt-2 text-sm text-${color}-700`}><p>{message}</p></div>}
        </div>
      </div>
    </div>
  );
};

export default Alert;