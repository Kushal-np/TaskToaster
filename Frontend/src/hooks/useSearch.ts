import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Custom hook for client-side search functionality with debouncing.
 * @param items The array of items to search through.
 * @param searchKeys The keys of the item object to search against.
 */
export const useSearch = <T>(items: T[], searchKeys: (keyof T)[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return items;
    return items.filter(item =>
      searchKeys.some(key => String(item[key]).toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    );
  }, [items, debouncedSearchTerm, searchKeys]);

  return { searchTerm, setSearchTerm, filteredItems };
};