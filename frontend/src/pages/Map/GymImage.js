import "./GymForm.css";
// icons
import { CgGym } from "react-icons/cg";
import { MdDirectionsBike } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { useState } from "react";

function GymImage(props) {
  const [gymType, setGymType] = useState(props.selectedGym.type);
  let image;
  if (gymType == "Run") {
    image = <FaRunning />;
  }
  if (gymType == "Bike") {
    image = <MdDirectionsBike />;
  }
  if (gymType == "Gym") {
    image = <CgGym />;
  }

  return <span>{image}</span>;
}

export default GymImage;
