import Image from "next/image";
import Landing from "./components/Landing";
import Camera from "./components/Camera"
import Camerapermission from "./components/Camerapermission";
import Process from "./components/Process"
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