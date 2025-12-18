import { useParams } from 'react-router-dom';
import TemplateForm from '../../components/features/templates/TemplateForm';

const EditTemplatePage = () => {
  const { id } = useParams();
  // Fetch template data to use as defaultValues
  const mockTemplate: any = {};

  const handleUpdateTemplate = (data: any) => {
    console.log('Updating template:', id, data);
    // Call API to update template
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Template</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <TemplateForm onSubmit={handleUpdateTemplate} defaultValues={mockTemplate} />
      </div>
    </div>
  );
};

export default EditTemplatePage;