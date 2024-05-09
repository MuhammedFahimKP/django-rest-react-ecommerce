import { useOutlet } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import ScreenContainer from "../../ui/user/ScreenContainer";
import Navbar from "../../components/admin/Navbar";

function Home() {
  const outlet = useOutlet();

  return (
    <ScreenContainer>
      <Navbar />
      <div className="flex">
        <SideBar />
        {outlet ? (
          outlet
        ) : (
          <div className="w-5/6 bg-teal-400 h-full">DashBoard</div>
        )}
      </div>
    </ScreenContainer>
  );
}

export default Home;
