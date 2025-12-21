import type { IAgendaTemplate } from '../../../types';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table';

interface TemplatePreviewProps {
  template: IAgendaTemplate;
}

const TemplatePreview = ({ template }: TemplatePreviewProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{template.name}</h2>
        <p className="text-sm text-gray-500">{template.description}</p>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {template.items.sort((a, b) => a.sequence - b.sequence).map((item, index) => (
              <TableRow key={index}><TableCell>{item.time}</TableCell><TableCell>{item.role}</TableCell><TableCell>{item.allocatedItem}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TemplatePreview;