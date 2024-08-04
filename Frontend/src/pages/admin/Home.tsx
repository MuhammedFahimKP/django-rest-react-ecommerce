import { useContext } from "react";
import { useOutlet } from "react-router-dom";
import { NotFoundContext } from "../../context";

import SideBar from "../../components/admin/SideBar";
import ScreenContainer from "../../ui/user/ScreenContainer";
import Navbar from "../../components/admin/Navbar";

import NotFound from "../../components/NotFound";

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
          <div className="flex">
            <SideBar />
            {outlet ? (
              outlet
            ) : (
              <div className="w-5/6 bg-teal-400 h-full">DashBoard</div>
            )}
          </div>
        </>
      )}
    </ScreenContainer>
  );
}

export default Home;
