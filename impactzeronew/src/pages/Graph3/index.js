import "./style.scss";
import GraphView3d from "../../components/Graph3d/graph"
import React, { useEffect, useRef, useState, useMemo } from "react";


function Graph3Export(props) {

    function valuefgref(lil) {

        props.set(lil)
    }
    function setInfoNode(r) {
        props.clickNodo(r)
    }
    return (
        <div className={props.className}>
            <div className={props.contra}>
                <div className={props.contra2}>
                    <GraphView3d nodeinput={props.nodein} traveler={props.travelIn} hand={valuefgref} flagValuestate={props.flagValue} nodeInfo={setInfoNode} />
                </div>
            </div>
        </div>

    );
}

export default Graph3Export;
