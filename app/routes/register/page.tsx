import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <section className="bg-white text-black rounded-xl p-10 w-4/5 flex flex-col justify-center items-center gap-10 mx-auto grow mb-10 drop-shadow-lg text-center font-bold">
    <h1>Register</h1>
    <RegisterForm />
   </section>
  );
};

export default RegisterPage;