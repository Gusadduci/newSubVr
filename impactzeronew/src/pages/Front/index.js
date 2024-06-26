import "./styles.scss";
import { useState } from "react";
import Button from "../../components/Button";
import Nav from "../../components/Nav";
import Swich from "../../components/Swich";
import Selector from "../../components/Selector";


function Front(props) {

    const [front, setFront] = useState("Diseño 2D")
    const [frontState, setFrontState] = useState("disable")
    const [inputValue, setInputValue] = useState("")

    function handleChangeIn(r) {

        setInputValue(r)
        props.inputV(r)
    }

    function handleCallBackFront() {

        setFrontState("countSelector")

    }




    function handleClickFront(e) {

        setFront(e)
        setFrontState("disable")

        if (e == "Diseño 2D") {

            props.state23(2)

        } else if (e == "Diseño 3D") {

            props.state23(3)

        } else {
            props.state23(4)
        }
    }


    return (

        <div className={props.exp}>
            <div className={props.exp2}>
                <div className="cuadrado">
                <div className="contentLogo">
                    <div className="title"> <a className="efect" /> Zero</div>
                </div>
                <div className="contentWrap">
                    <div className="contentSearch">
                        <div className="countSwich">
                            <Swich value={front} className="swich" click={handleCallBackFront} />
                            <Selector click={handleClickFront} state={frontState} />
                        </div>
                        <Nav className="search" infoSearch="What are you looking for ?" change={handleChangeIn} />
                        <Button value="🔍︎" className="primary button inicio" click={props.click} valInput={inputValue} />
                    </div>
                </div>
                </div>
            </div>
        </div>


    );
}

export default Front;
