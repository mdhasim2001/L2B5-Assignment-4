import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div>
      <div className="py-10">
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            <span className="text-red-500">Chapter</span> House
          </h1>
          <ul className="flex items-center gap-10">
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/addBook">Add Book</Link>
            </li>
            <li>
              <Link to="/borrow">Borrow</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
