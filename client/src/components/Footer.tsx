import { Link } from "react-router";

export const Footer = () => {
  return (
    <div className="py-10">
      <div className="lg:w-4/5 lg:mx-auto">
        <footer className="">
          <div className="w-full">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a
                href="https://flowbite.com/"
                className="flex items-center mb-4 text-xl sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-red-500 font-semibold whitespace-nowrap dark:text-white">
                  Chapter
                </span>
                House
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <Link to="/books" className="hover:underline me-4 md:me-6">
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/addBook" className="hover:underline me-4 md:me-6">
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link to="/borrow" className="hover:underline me-4 md:me-6">
                    Borrow
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
