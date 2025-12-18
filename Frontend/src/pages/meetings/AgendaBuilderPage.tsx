import { useParams } from 'react-router-dom';
import TemplateSelector from '../../components/features/templates/TemplateSelector';
import RolePalette from '../../components/features/meetings/RolePalette';

const AgendaBuilderPage = () => {
  const { id } = useParams();
  // Fetch templates and meeting data

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Agenda Builder for Meeting {id}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <TemplateSelector templates={[]} onSelect={() => {}} />
          <div className="h-96 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500"><p>Drag & Drop Agenda Editor Area</p></div>
        </div>
        <RolePalette />
      </div>
    </div>
  );
};

export default AgendaBuilderPage;