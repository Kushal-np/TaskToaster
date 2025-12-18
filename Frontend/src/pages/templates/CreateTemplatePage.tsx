import TemplateForm from '../../components/features/templates/TemplateForm';

const CreateTemplatePage = () => {
  const handleCreateTemplate = (data: any) => {
    console.log('Creating template:', data);
    // Call API to create template
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Template</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <TemplateForm onSubmit={handleCreateTemplate} />
      </div>
    </div>
  );
};

export default CreateTemplatePage;