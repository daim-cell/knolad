'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import RadioButton from '../../components/Radio';


export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [category, setCategory] = useState<string>('admin');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
        setCategory(event.target.value);
    };

  const handleSubmit = async (event:any) => {
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
      toast.success( "Registration Successful" );
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register your user
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                ></input>
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
                ></input>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center">
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
        {/* </div> */}
                </div>

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
      </div>
      <Toaster position="top-center" /> 
    </section>
    
  );
}
