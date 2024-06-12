import SurveyForm from '../../components/SurveyForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Create a New Survey</h1>
      <SurveyForm />
    </div>
  );
}