import "./styles.scss";
import { useState } from 'react';

function Swich(props) {



    function handleClick() {

        props.click()
    }



    return (
        <div className="countButton">

            <button onClick={handleClick} className={props.className}> {props.value} <div className="imageSwich" ></div> </button>
        </div>
    );
}

export default Swich;