import TemplateCard from './TemplateCard';
import EmptyState from '../../ui/EmptyState';
import type { IAgendaTemplate } from '../../../types';

interface TemplateListProps {
  templates: IAgendaTemplate[];
}

const TemplateList = ({ templates }: TemplateListProps) => {
  if (!templates || templates.length === 0) {
    return <EmptyState title="No Templates Found" message="Create a new template to get started." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => <TemplateCard key={template._id} template={template} />)}
    </div>
  );
};

export default TemplateList;