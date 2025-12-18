import type { IAgendaTemplate } from '../../../types';
import Select from '../../ui/Select';

interface TemplateSelectorProps {
  templates: IAgendaTemplate[];
  onSelect: (templateId: string) => void;
  isLoading?: boolean;
}

const TemplateSelector = ({ templates, onSelect, isLoading }: TemplateSelectorProps) => {
  return (
    <div>
      <label htmlFor="template-selector" className="block text-sm font-medium text-gray-700">
        Apply a Template
      </label>
      <Select
        id="template-selector"
        onChange={(e) => onSelect(e.target.value)}
        disabled={isLoading}
      >
        <option value="">Select a template...</option>
        {templates.map((template) => <option key={template._id} value={template._id}>{template.name}</option>)}
      </Select>
    </div>
  );
};

export default TemplateSelector;