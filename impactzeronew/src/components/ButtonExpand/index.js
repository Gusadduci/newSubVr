import "./style.scss";
import React, { useEffect, useRef, useState, useMemo } from "react";

function ButtonExpand(props) {
  function handleClick() {
    console.log(props.click)
    props.click()
  }

  

  return (
    <div className="countButton">

      <button onClick={handleClick} className={props.className}></button>

    </div>
  );
}

export default ButtonExpand;