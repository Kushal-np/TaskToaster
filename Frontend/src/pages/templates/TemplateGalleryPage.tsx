import { Link } from 'react-router-dom';
import TemplateList from '../../components/features/templates/TemplateList';
import { Button } from '../../components/ui/Button';

const TemplateGalleryPage = () => {
  // Fetch templates data
  const mockTemplates: any[] = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Template Gallery</h1>
        <Link to="/templates/create"><Button>Create Template</Button></Link>
      </div>
      <TemplateList templates={mockTemplates} />
    </div>
  );
};

export default TemplateGalleryPage;