import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import type { IAgendaTemplate } from '../../../types';

interface TemplateCardProps {
  template: IAgendaTemplate;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Link to={`/templates/${template._id}`} className="block hover:shadow-lg transition-shadow duration-200">
      <Card>
        <Card.Header>
          <p className="text-base font-semibold text-indigo-600 truncate">{template.name}</p>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-gray-600 line-clamp-2">{template.description || 'No description provided.'}</p>
        </Card.Body>
        <Card.Footer>{template.isDefault && <Badge color="green">Default</Badge>}</Card.Footer>
      </Card>
    </Link>
  );
};

export default TemplateCard;