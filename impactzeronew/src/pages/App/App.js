import "./App.scss";
import Graph2Export from '../Graph2/index';
import Graph3Export from '../Graph3/index';
import Front from '../Front/index';
import Button from "../../components/Button";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Nav from "../../components/Nav";
import ButtonExpand from "../../components/ButtonExpand"
import Target from "../../components/Target"
import FilterTarget from "../../components/FilterTarget";
function App() {
  const [blockButtons, setBlockButtons] = useState("disable")
  const [block, setBlock] = useState("flex")
  const [block2d, setBlock2d] = useState("contentGraph disablepages")
  const [block3d, setBlock3d] = useState("contentGraph disablepages")
  const [blockVr, setBlockVr] = useState("contentGraph disablepages")
  const [flag, setflag] = useState(true)
  const [flagFog, setflagFog] = useState(true)
  const [graph23, setGraph23] = useState(2)
  const [efectExpand, setEfectExpand] = useState("content")
  const [efectZero, setEfectZero] = useState("")
  const [efectoContra, setEfectoContra] = useState("")
  const [efectZeroDisable, setEfectZeroDisable] = useState("")
  const [inputVal, setInputVal] = useState("")
  const [portFgRef, setPortFgRef] = useState()
  const [travel, setTravel] = useState(true)
  const [nodeInput, setNodeInput] = useState()
  const [flagTarget, setFlagTarget] = useState("ocult")
  const [flagTargetFilter, setFlagTargetFilter] = useState("ocult")
  const [infoFilter, setInfoFilter] = useState({ nodes: [{ id: 0 }], links: [] })
  const [flagFilter, setflagFilter] = useState(false)
  const [Fresh, setFresh] = useState("ocult")
  const [nodoInfo, setNodoInfo] = useState({
    "id": "null",
    "type": "null",
    "elementId": "null"
  })

  function fgRefvalue(o) {

    setPortFgRef(o)
  }
  function inputValueExport(e) {
    setInputVal(e)

  }


  function temporizador() {
    let node = portFgRef.nodes.find(node => node.id == inputVal);
    if (node != undefined) {
      setNodeInput(node)
      setTravel(false)
    }
    setEfectZero("disableFront")
    setEfectExpand("content expand")
    setEfectoContra("contentwo contra")
    setEfectZeroDisable("disableGraphs")
    setBlockButtons("disable")

    setTimeout(blockDesblock, 100)

  }

  function blockDesblock() {

    if (flag === true) {

      setEfectoContra("contentwo")
      setBlock("disablepages")
      setEfectZeroDisable("")
      setBlockButtons("")
      setflag(false)
      setflagFog(false)
      if (graph23 === 2) {
        setBlock2d("contentGraph")
        setflag(false)
      } else if (graph23 === 3) {
        setBlock3d("contentGraph")
        setflag(false)
      } else {
        setBlockVr("contentGraph")
        setflag(false)
      }

    } else {
      setTravel(true)
      setEfectExpand("content")
      setEfectZero("")
      setBlock("flex")
      setflag(true)
      setBlock2d("contentGraph disablepages")
      setBlock3d("contentGraph disablepages")
      setBlockVr("contentGraph disablepages")
    }
  }

  function traveInGraph() {

    let node = portFgRef.nodes.find(node => node.id == inputVal);


    if (node != undefined) {
      setNodeInput(node)
      setTravel(false)
    } else { setTravel(true) }
  }


  function graphState(valueState) {
    setGraph23(valueState)

  }
  function changeFlagTarget() {


    if (flagTarget == "ocult") {
      setFlagTarget("expandido")

    } else {
      setFlagTarget("ocult")
    }

  }

  function changeFlagTargetFilter() {


    if (flagTargetFilter == "ocult") {
      setFlagTargetFilter("expandidoFiltro")
      setFresh("fresh")
    } else {
      setFlagTargetFilter("ocult")
      setFresh("ocult")
    }

  }

  function nodoInfoSet(nodo) {
    setNodoInfo(nodo)
    setTravel(true)
  }
  function saveInfo(e) {
    setInfoFilter(e)
  }

  return (
    <div className="App">
      <div className="principalContainer">
        <div className={block}>
          <Front click={temporizador} inputV={inputValueExport} state23={graphState} exp={efectExpand} exp2={efectZero} />
          <div className="info">
            <div className="informacion"><div className="consulta"></div> <div className="inf"><p className="title"> Visualiza los procesos.</p> <p className="textacomp">Permite identificar los componentes afectados</p> </div></div>
            <div className="informacion"><div className="optimiza"></div> <div className="inf"><p className="title">Consulta y filtra </p> <p className="textacomp">Facilita seguimiento de procesos para operaciones</p> </div></div>
            <div className="informacion"><div className="visualiza"></div> <div className="inf"><p className="title">  Optimiza tiempo y calidad</p> <p className="textacomp">Navegación eficaz y resolutiva </p> </div></div>
          </div>
        </div>

        <div className={block2d}>
          <Graph2Export contra={efectoContra} contra2={efectZeroDisable} nodein={nodeInput} travelIn={travel} set={fgRefvalue} clickNodo={nodoInfoSet} newData={infoFilter} cambios={Fresh} />
        </div>

        <div>
          <Graph3Export className={block3d} travelIn={travel} contra={efectoContra} contra2={efectZeroDisable} set={fgRefvalue} flagValue={flagFog} nodein={nodeInput} clickNodo={nodoInfoSet} />
        </div>
      </div>

      <div className="selectorContainer positionBack">
        <div className="backContainer">
          <div className={blockButtons}>
            <Button value="Volver" className="back" img="flecha" mostrarCaja={true} click={temporizador} />
          </div>
        </div>
      </div>

      <div className="selectorContainer">
        <div className={blockButtons}>
          <div className="positionSearch">
            <Button value="🔍︎" className="primary button buscar distance" mostrarCaja={true} valInput={inputVal} click={traveInGraph} />
            <Nav className="search continue" infoSearch="Escribe en Impact el componente" change={inputValueExport} />

          </div>
          <div className="lejos">
            <div >
              <ButtonExpand value="I" className="primary button I" click={changeFlagTarget} />
              <Target className={flagTarget} nodo={nodoInfo} />
            </div>
            <div >
              <ButtonExpand value="F" className="primary button F" click={changeFlagTargetFilter} />
              <FilterTarget className={flagTargetFilter} saveData={saveInfo} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
