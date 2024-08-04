import { useEffect, useState } from "react";

import { useLocation, useOutlet } from "react-router-dom";

import { useWindowDimensions } from "../../hooks";
import NotFound from "../../components/NotFound";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

import ProfileSec from "../../components/user/ProfileSec";

import { RxHamburgerMenu } from "react-icons/rx";

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
  }, [width, loaction]);
  return (
    <>
      <div className="lg:h-20 bg-black h-16 mb-0 sticky top-0 z-50 w-full   ">
        <Navbar onOpen={() => false} />
      </div>
      <div className="bg-white text-black min-h-screen  px-6 py-2  font-ubuntu">
        {/* Breadcrumb */}

        <div className="flex items-center justify-normal gap-4  mt-4">
          {width < 900 && (
            <button
              type="button"
              className="text-black   "
              data-hs-overlay="#docs-sidebar"
              aria-controls="docs-sidebar"
              aria-label="Toggle navigation"
              onClick={() => setSideBar(!sideBar)}
            >
              <RxHamburgerMenu className="text-2xl" />
            </button>
          )}
          {/* End Navigation Toggle */}
          {/* Sidebar */}

          <h1 className="text-2xl   ">My {title}</h1>
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar */}
          {width > 900 && (
            <div className="w-full   bg-white  lg:w-1/4 lg:pr-8 mb-6 lg:mb-0">
              <ProfileSec />
            </div>
          )}
          {/* Main Content */}
          {outlet}
        </div>
      </div>

      {sideBar && (
        <div
          className="w-full  font-ubuntu fixed flex items-center md:items-start   md:justify-start md:px-6 md:py-7   justify-center top-0 left-0 z-50 h-full  backdrop-blur-sm"
          onClick={() => setSideBar(false)}
        >
          <ProfileSec />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Accounts;
