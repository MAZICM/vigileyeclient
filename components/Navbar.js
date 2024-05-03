import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vigil Eye</h1>
        <div className="flex space-x-6">
          <Link href="/" className="text-white hover:text-blue-300 transition">
            Home
          </Link>
          <Link href="/users" className="text-white hover:text-blue-300 transition">
            Users
          </Link>
          <Link href="/add-user" className="text-white hover:text-blue-300 transition">
            Add User
          </Link>
          <Link href="/logs" className="text-white hover:text-blue-300 transition">
            Logs
          </Link>
          <Link href="/history" className="text-white hover:text-blue-300 transition">
            Model History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
