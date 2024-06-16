import SurveyList from '../../components/SurveyList';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All Surveys</h1>
        <Link href="/">
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </div>
      <SurveyList />
    </div>
  );
}