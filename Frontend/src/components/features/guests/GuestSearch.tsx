import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '../../ui/Input';

interface GuestSearchProps {
  onSearch: (query: string) => void;
}

const GuestSearch = ({ onSearch }: GuestSearchProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search guests by name or email..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default GuestSearch;