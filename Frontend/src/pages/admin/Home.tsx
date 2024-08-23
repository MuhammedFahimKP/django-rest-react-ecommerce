import { useContext } from "react";
import { useOutlet } from "react-router-dom";
import { NotFoundContext } from "../../context";

import DashBoard from "../../components/admin/DashBoard";

import SideBar from "../../components/admin/SideBar";
import ScreenContainer from "../../ui/user/ScreenContainer";
import Navbar from "../../components/admin/Navbar";

import NotFound from "../../components/NotFound";

import LoaderWithoutBg from "../../components/user/LoaderWithoutBg";

function Home() {
  const outlet = useOutlet();

  const notFound = useContext(NotFoundContext);

  return (
    <ScreenContainer>
      {notFound?.notFoundItem ? (
        <NotFound />
      ) : (
        <>
          <Navbar />

          <div className="flex font-roboto">
            <SideBar />
            <div className="lg:ml-64 w-full mt-20 overflow-hidden">
              {outlet ? outlet : <DashBoard />}
            </div>
          </div>
        </>
      )}
    </ScreenContainer>
  );
}

export default Home;
