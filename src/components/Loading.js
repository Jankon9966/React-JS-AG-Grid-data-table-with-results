import React, { useState } from "react";
import "./Loading.css";
import { PuffLoader } from "react-spinners";

const Loading = () => {

  const [color, setColor] = useState("#ffffff")

  return (
    <div className="loading">
      <PuffLoader color={color} size={100} />
    </div>
  );
};

export default Loading;
