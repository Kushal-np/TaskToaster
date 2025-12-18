import type { IAgendaItem } from '../../../types';
import { TableRow, TableCell } from '../../ui/Table';

const AgendaRow = ({ item }: { item: IAgendaItem }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{item.time}</TableCell>
      <TableCell>{item.role}</TableCell>
      <TableCell>{item.assignedToName || <span className="italic text-gray-400">Unassigned</span>}</TableCell>
      <TableCell>{item.allocatedTime}</TableCell>
    </TableRow>
  );
};

export default AgendaRow;