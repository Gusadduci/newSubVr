import "./style.scss";
import React, { useEffect, useRef, useState, useMemo } from "react";
import datos from "../../data/datos.json"
import { ForceGraph2D } from 'react-force-graph';
import * as THREE from '//unpkg.com/three/build/three.module.js';
import archivo from "../images/archivo.png";
import copy from "../images/copy.png";
import ftp from "../images/ftp.png";
import jcl from "..//images/jcl.png";
import programa from "../images/programa.png";
import schedule from "..//images/schedule.png";
import send from "../images/send.png";
import db2 from "../images/db2.png";



export default function GrapView(props) {

    const { useRef, useCallback } = React;
    var ancho = window.screen.width;
    var alto = window.innerHeight;
    const data = datos;
    const fgRef = useRef();
    fgRef.hackdata = data;
    props.hand(fgRef.hackdata)
    const [newData, setNewData] = useState(data)


    newData.nodes.forEach((node) => {
        if (node.id == newData.nodes.id) {
            const link = newData.links.find((link) => link.target === node.id);
            node.clusterId = link && link.source;
        } else {
            node.clusterId = false
        }
    });

    const clusters = newData.nodes.filter((node) => node);
    const clusterIds = clusters.map((cluster) => cluster.id);


    function Filtrado() {
        if (newData == props.newInfo) {

            setNewData(data)

        } else {
            setNewData(props.newInfo)


        }

    }



    function nodeDragEnd(node) {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    }


    function backgroundClick(evt) {
        console.log(evt)
    }

    const handleNodeClick = (node) => {
        fgRef.current.zoom(6, 1400);
        fgRef.current.centerAt(node.x, node.y, 1400);
        props.nodeInfo(node)
    }

    function estateInitial(node) {
        if (props.traveler === false) {
            handleNodeClick(props.nodeinput)

        }

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

    const handleNodeHover = node => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
            highlightNodes.add(node);
            data.links.forEach(link => {
                if (link.source.elementId === node.elementId) {

                    highlightLinks.add(fgRef.current)

                }
            }


            );

        }

        updateHighlight();
    };


    return (
        <div >

            <ForceGraph2D

                linkColor={() => "#757575"}
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 3 : 0}
                linkDirectionalParticleSpeed={() => 1 * 0.35}
                linkDirectionalParticles={4}
                onLinkClick={(link) => fgRef.current.emitParticle(link)}
                height={alto}
                width={ancho}
                ref={fgRef}
                onNodeClick={handleNodeClick}
                graphData={newData}
                linkDirectionalParticleColor={() => "white"}
                linkHoverPrecision={10}
                linkVisibility={(link) => {
                    if (
                        clusterIds.includes(link.source.id) &&
                        clusterIds.includes(link.target.id)
                    ) {
                        return true;
                    } else return false;
                }}



                nodeCanvasObjectMode={() => "after"}
                onNodeDragEnd={nodeDragEnd}
                onBackgroundClick={backgroundClick}
                backgroundColor="transparent"
                autoPauseRedraw={false}
                linkWidth={link => highlightLinks.has(link) ? 3 : 1}
                onLinkHover={handleLinkHover}
                onNodeHover={handleNodeHover}
                nodeCanvasObject={(node, ctx) => {
                    const size = 15;
                    const img = new Image();
                    if (node.type === "ARCHIVO") {
                        img.src = archivo
                    } else if (node.type === "JCL") {
                        img.src = jcl
                    } else if (node.type === "PROGRAMA") {
                        img.src = programa
                    } else if (node.type === "SENDMAIL") {
                        img.src = send
                    } else if (node.type === "SCHEDULE") {
                        img.src = schedule
                    } else if (node.type === "FTP") {
                        img.src = ftp
                    } else if (node.type === "COPY") {
                        img.src = copy
                    } else if (node.type === "DB2") {
                        img.src = db2
                    }
                    node.imgs = img;
                    ctx.drawImage(
                        img,
                        node.x - size / 1.7,
                        node.y - size / 2,
                        size + 1,
                        size
                    );
                    ctx.beginPath();
                    const fontSize = 3
                    ctx.font = `${fontSize}px Sans-Serif`;
                    if (data.nodes.level !== "signal") {
                        const label = node.id;
                        ctx.font = `arial-bold-italic`;
                        ctx.textAlign = "center";
                        ctx.fillStyle = "white"; //node.color;
                        ctx.fillText(label, node.x, node.y + 11);
                    }

                    return ctx;

                }}

            />

            <button onClick={Filtrado} className={props.cambios}>APLICAR</button>

        </div>

    );
};




