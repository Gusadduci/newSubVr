import "./style.scss";
import { useState } from 'react';

function Button(props) {

  function handleSearch() {

    props.click(props.valInput)
  }



  return (

<div>
    <div className={props.img}></div>
    <button onClick={handleSearch} className={props.className}> {props.value} </button>
    </div>

  );
}

export default Button;