import "./styles.scss";
import { useState } from 'react';

function Selector(props) {






    function handleClickSelector1() {

        props.click("Diseño 2D")

    }
    function handleClickSelector2() {


        props.click("Diseño 3D")

    }



    return (

        <div className={props.state}>
            <button onClick={handleClickSelector1} className="selectorButton">Diseño 2D</button>
            <div className="line"></div>
            <button onClick={handleClickSelector2} className="selectorButton abajo">Diseño 3D</button>
        </div>

    );
}

export default Selector;