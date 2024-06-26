import "./style.scss";
import datos from "../../data/datos.json";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Swich from "../Swich";

function FilterTarget(props) {
    const { useRef, useState } = React;
    const [newData, setNewData] = useState(datos)
    const [Switch, setSwitch] = useState("switch verdefluor")
    const [SwitchArchivo, setSwitchArchivo] = useState("switch azul")
    const [SwitchJcl, setSwitchJcl] = useState("switch verde")
    const [SwitchPrograma, setSwitchPrograma] = useState("switch rojo")
    const [SwitchSend, setSwitchSend] = useState("switch naranja")
    const [SwitchSchedule, setSwitchSchedule] = useState("switch celeste")
    const [SwitchFtp, setSwitchFtp] = useState("switch violeta")
    const [SwitchCopy, setSwitchCopy] = useState("switch amarillo")
    const [SwitchDb2, setSwitchDb2] = useState("switch turquesa")



    function FilterArchivo() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "ARCHIVO") }),
            "links": datos.links

        })

        setSwitchArchivo("switch gris")

    }


    function FilterJcl() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "JCL") }),
            "links": datos.links

        })

        setSwitchJcl("switch gris")

    }
    function FilterPrograma() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "PROGRAMA") }),
            "links": datos.links
        })

        setSwitchPrograma("switch gris")

    }
    function FilterSend() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "SENDMAIL") }),
            "links": datos.links
        })

        setSwitchSend("switch gris")

    }
    function FilterSchedule() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "SCHEDULE") }),
            "links": datos.links
        })
        setSwitchSchedule("switch gris")


    }
    function FilterFtp() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "FTP") }),
            "links": datos.links
        })
        setSwitchFtp("switch gris")


    }
    function FilterCopy() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "COPY") }),
            "links": datos.links
        })

        setSwitchCopy("switch gris")

    }
    function FilterDb2() {
        setNewData({
            "nodes": newData.nodes.filter(node => { return (node.type !== "DB2") }),
            "links": datos.links
        })

        setSwitchDb2("switch gris")

    }
    function FilterRestaur() {
        setNewData({
            "nodes": datos.nodes,
            "links": datos.links

        })
        setSwitch("switch verdefluor")
        setSwitchArchivo("switch azul")
        setSwitchJcl("switch verde")
        setSwitchPrograma("switch rojo")
        setSwitchSend("switch naranja")
        setSwitchSchedule("switch celeste")
        setSwitchFtp("switch violeta")
        setSwitchCopy("switch amarillo")
        setSwitchDb2("switch turquesa")
    }

    props.saveData(newData)



    return <div className={props.className}>
        <div className="contentSwitch">

            <button className={SwitchArchivo} onClick={FilterArchivo}>ARCHIVO</button>
            <button className={SwitchJcl} onClick={FilterJcl} >JCL</button>
            <button className={SwitchPrograma} onClick={FilterPrograma} >PROGRAMA</button>
            <button className={SwitchSend} onClick={FilterSend} >SENDMAIL</button>
            <button className={SwitchSchedule} onClick={FilterSchedule} >SCHEDULE</button>
            <button className={SwitchFtp} onClick={FilterFtp} >FTP</button>
            <button className={SwitchCopy} onClick={FilterCopy} >COPY</button>
            <button className={SwitchDb2} onClick={FilterDb2} >DB2</button>
            <br></br>

            <button className="switch reset" onClick={FilterRestaur}> RESET</button>
        </div>
    </div>
}

export default FilterTarget;
