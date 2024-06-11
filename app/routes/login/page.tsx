import Link from "next/link"
import LoginForm from "../../components/Login"

export default function Home() {
  return (
    <section className="bg-black text-white rounded-xl p-10 w-4/5 flex flex-col justify-center items-center gap-10 mx-auto grow mb-10 drop-shadow-lg text-center font-bold">
     <h1>Login</h1>
     <LoginForm />
     <p>
        Don't have an account?
        <Link href="register">
          Register here
        </Link>
      </p>
    </section>
  )
}