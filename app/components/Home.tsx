import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <Link href="/">
      <button className="bg-green-500 text-white py-2 px-4 rounded">
        Home
      </button>
    </Link>
  );
};

export default HomeButton;