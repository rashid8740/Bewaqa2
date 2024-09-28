import Image from "next/image";
import Landing from "./components/Landing/page";
import Camera from "./components/Camera/page";
import Camerapermission from "./components/Camerapermission/page";
import Process from "./components/Process/page";
export default function Home() {
  return (
    <div className="text-black">
      <Landing />
      <Camera />
      <Camerapermission />
      <Process />
    </div>
  );
}
