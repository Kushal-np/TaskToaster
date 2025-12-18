import { MagnetIcon } from 'lucide-react';
import Input from '../ui/Input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search..." }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnetIcon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;