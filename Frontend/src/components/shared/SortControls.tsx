import Select from '../ui/Select';

interface SortControlsProps {
  onSortChange: (sortBy: string) => void;
}

const SortControls = ({ onSortChange }: SortControlsProps) => {
  return (
    <Select onChange={(e) => onSortChange(e.target.value)}>
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="name-asc">Name (A-Z)</option>
    </Select>
  );
};

export default SortControls;