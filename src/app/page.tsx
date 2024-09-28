import Image from "next/image";
import Landing from "./components/Landing";
import Camera from "./components/Camera/page"
import Camerapermission from "./components/Camerapermission/page";
import Process from "./components/Process/page"
export default function Home() {
  return (
    <div >

       <Landing/>
       <Camera/>
       <Camerapermission/>
       <Process/>
    </div>
  );
}