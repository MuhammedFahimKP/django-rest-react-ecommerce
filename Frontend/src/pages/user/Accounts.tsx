import { useEffect, useState } from "react";

import { useLocation, useOutlet } from "react-router-dom";

import { useWindowDimensions } from "../../hooks";
import NotFound from "../../components/NotFound";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

const Accounts = () => {
  const { width } = useWindowDimensions();
  const [sideBar, setSideBar] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const loaction = useLocation();

  const outlet = useOutlet();

  if (!outlet) {
    return <NotFound />;
  }

  useEffect(() => {
    if (width > 900) {
      setSideBar(false);
    }

    const _title = loaction.pathname.split("/")[2];

    _title !== "" &&
      setTitle(_title.charAt(0).toUpperCase() + _title.slice(1).toLowerCase());
  }, [width]);
  return (
    <>
      <div className="lg:h-20 bg-black h-16 mb-0 sticky top-0 z-50 w-full   ">
        <Navbar onOpen={() => false} />
      </div>
      <div className="bg-white text-black min-h-screen p-4 md:p-6 lg:p-8 font-ubuntu">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4 md:mb-6">
          <a href="#" className="text-blue-400">
            Home
          </a>{" "}
          &gt;
          <a href="#" className="text-blue-400">
            My account
          </a>{" "}
          &gt;
          <span>All orders</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          My {title}
        </h1>
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar */}
          {width > 900 ? (
            <div className="w-full   bg-white  lg:w-1/4 lg:pr-8 mb-6 lg:mb-0">
              <div className=" border-2 border-gray-200 shadow-lg rounded-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">Jese Leos (Personal)</p>
                    <p className="text-sm text-gray-400">jese@flowbite.com</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li className="text-red-500">Log out</li>
                  </ul>
                </nav>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                data-hs-overlay="#docs-sidebar"
                aria-controls="docs-sidebar"
                aria-label="Toggle navigation"
                onClick={() => setSideBar(!sideBar)}
              >
                <span className="sr-only">Toggle Navigation</span>
                <svg
                  className="flex-shrink-0 size-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
              {/* End Navigation Toggle */}
              {/* Sidebar */}
            </>
          )}
          {/* Main Content */}
          {outlet}
        </div>
      </div>

      {sideBar && (
        <div
          className="w-full  font-ubuntu fixed flex items-center md:items-start   md:justify-start md:px-6 md:py-7   justify-center top-0 left-0 z-50 h-full  backdrop-blur-xl"
          onClick={() => setSideBar(false)}
        >
          <div className=" border-2 bg-white border-gray-200 shadow-lg rounded-lg p-4 mb-4 ">
            <div className="flex items-center mb-4">
              <img
                src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">Jese Leos (Personal)</p>
                <p className="text-sm text-gray-400">jese@flowbite.com</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                Profile
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm">
                Gifts
              </button>
              <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm">
                Wallet
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                <li className="bg-gray-200 p-2 rounded">My orders</li>
                <li>Reviews</li>
                <li>Delivery addresses</li>
                <li>Recently viewed</li>
                <li>Favourite items</li>
                <li>Settings</li>
                <li className="text-red-500">Log out</li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Accounts;
