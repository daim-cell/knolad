'use client'
import SurveyList from '../../components/SurveyList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session, status } : any = useSession();


  if (status === 'loading') {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-600 dark:text-gray-300 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
            ></path>
          </svg>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading, please wait...
          </p>
        </div>
      </section>
    );
  }

  if (session?.user?.user?.category !== "student") {

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">All Surveys</h1>
      <SurveyList />
    </div>
  );

}
router.push('/');
}