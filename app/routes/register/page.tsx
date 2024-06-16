'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import RadioButton from '../../components/Radio';
import HomeButton from '../../components/Home';


export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState<string>('admin');
  const { data: session, status } : any = useSession();

  useEffect(() => {
    if (session) {
      const category = session?.user?.user?.category;
      console.log("session in home", category);
      setRole(category);
    }
  }, [session]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('Form submitted with email:', email, 'and password:', password, category);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, category }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      toast.success("Registration Successful");
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed");
    }
  };

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

  if (session?.user?.user?.category == "admin") {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <HomeButton />
          </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register your user
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-evenly items-center space-x-8">
                <RadioButton 
                  label="Admin" 
                  name="options" 
                  value="admin" 
                  checked={category === 'admin'} 
                  onChange={handleOptionChange} 
                />
                <RadioButton 
                  label="Teacher" 
                  name="options" 
                  value="teacher" 
                  checked={category === 'teacher'} 
                  onChange={handleOptionChange} 
                />
                <RadioButton 
                  label="Student" 
                  name="options" 
                  value="student" 
                  checked={category === 'student'} 
                  onChange={handleOptionChange} 
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-500 hover:bg-gray-600 border-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <Toaster position="top-center" /> 
      </section>
    );
  }
  router.push('/');
}
