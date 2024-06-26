import "./style.scss";
import datos from "../../data/datos.json";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ForceGraphVR, ForceGraph3D } from 'react-force-graph';
import * as THREE from '//unpkg.com/three/build/three.module.js';


export default function GraphView3d(props) {
    var ancho = window.screen.width;
    var alto = window.innerHeight;

    function onNodeDragEnd(node) {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    }

    function onBackgroundClick(evt) {
        console.log("background click");

    }

    function onNodeRightClick(node, fgRef) {
        travel(node, fgRef);
    }

    function onBackgroundRightClick(evt, fgRef) {
        console.log("background right click");
        console.log(fgRef.hackdata);

        if (evt.ctrlKey) {

            autoLevelByDistance(evt, fgRef)

        } else {

            autoLevelByLabel(evt, fgRef);
        }
    }

    function autoLevelByDistance(evt, fgRef) {
        console.log("aplicando autolevelbydistance");
        fgRef.current.pauseAnimation();
        fgRef.hackdata.nodes.forEach(node => { node.distance === undefined ? node.fy = 0 : node.fy = Number(node.distance) * 70 })
        fgRef.current.resumeAnimation();
        //    fgRef.current.numDimensions(3); // @TODO: necesario para que refresque el render, buscar la manera que funcione
    }

    function setLevelByLabel(label, value, fgRef) {
        console.log("aplicando autolevelbylabel");
        fgRef.current.pauseAnimation();
        fgRef.hackdata.nodes.filter(node => node.type === label).forEach(node => node.fy = Number(value))
        fgRef.current.resumeAnimation();
        //    fgRef.current.numDimensions(3); // @TODO: necesario para que refresque el render, buscar la manera que funcione
    }

    function autoLevelByLabel(evt, fgRef) {
        setLevelByLabel('SENDMAIL', 0, fgRef);
        setLevelByLabel('DB2', 100, fgRef);
        setLevelByLabel('FTP', 200, fgRef);
        setLevelByLabel('COPY', 300, fgRef);
        setLevelByLabel('PROGRAMA', 400, fgRef);
        setLevelByLabel('JCL', 500, fgRef);
        setLevelByLabel('SCHEDULE', 600, fgRef);
    }



    function travel(node, fgRef) {
        //const distance = settings.aimDistance;
        const distance = 100;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        const newPos = node.x || node.y || node.z
            ? { x: node.x * distRatio, y: node.y * distRatio / 2, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)
        fgRef.current.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    }



    const { useRef } = React;
    const data = datos;
    const fgRef = useRef();
    fgRef.hackdata = data;
    props.hand(fgRef.hackdata)

    function nodeClick(node) {

        props.nodeInfo(node)


    }

    function estateInitial(evt) {
        if (props.traveler == false) {

            travel(props.nodeinput, fgRef)
        }

        /*      if (props.flagValuestate === false) {
                  autoLevelByDistance(evt, fgRef)
      
              } */
    }

    estateInitial()

    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [highlightNodes, setHighlightNodes] = useState(new Set());

    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };
    const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };


    return (<ForceGraph3D
        onNodeClick={nodeClick}
        backgroundColor="rgba(0,0,0,0.0)"
        nodeThreeObject={({ img }) => {
            const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
            const material = new THREE.SpriteMaterial({ map: imgTexture });
            const sprite = new THREE.Sprite(material)
            sprite.scale.set(13, 13);
            return sprite;
        }
        }

        nodeVal={5}
        strength={-700}
        linkWidth={link => highlightLinks.has(link) ? 3 : 1}
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 3 : 0}
        linkDirectionalParticleSpeed={() => 1 * 0.35}
        linkDirectionalParticles={4}
        onLinkHover={handleLinkHover}
        graphData={data}
        height={alto}
        width={ancho}
        nodeLabel="id"
        ref={fgRef}
        linkDirectionalParticleColor={() => "white"}
        linkHoverPrecision={50}
        onLinkClick={(link) => fgRef.current.emitParticle(link)}
        nodeCanvasObjectMode={() => "after"}
        onNodeDragEnd={onNodeDragEnd}
        onBackgroundClick={onBackgroundClick}
        onBackgroundRightClick={(evt) => onBackgroundRightClick(evt, fgRef)}
        onNodeRightClick={(node) => { onNodeRightClick(node, fgRef) }}


    />)

};



/*
       nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            ctx.fillStyle = "transparent"; //background color
            ctx.font = `arial-bold-italic`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white"; //node.color;
            ctx.fillText(label, node.x, node.y + 8);
        }}


*/


