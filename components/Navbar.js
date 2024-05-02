import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <div>
          {/* Correct use of Link without an inner <a> tag */}
          <Link href="/">
            Home
          </Link>
          <Link href="/add-user">
            Add User
          </Link>
          <Link href="/logs">
            Logs
          </Link>
          <Link href="/history">
            Model History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
