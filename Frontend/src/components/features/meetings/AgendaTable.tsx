import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';
import EmptyState from '../../ui/EmptyState';
import AgendaRow from './AgendaRow';
import type { IAgendaItem } from '../../../types';

interface AgendaTableProps {
  items: IAgendaItem[];
}

const AgendaTable = ({ items }: AgendaTableProps) => {
  if (!items || items.length === 0) {
    return <EmptyState title="No Agenda Items" message="This meeting's agenda is empty." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => <AgendaRow key={item._id} item={item} />)}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgendaTable;