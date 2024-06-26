import "./style.scss";

function Target(props) {


    return <div className={props.className}>

        <div className="space2">Type: {props.nodo.type}</div>
        <div className="line"></div>
        <div className="space2">Id: {props.nodo.id}</div>
        <div className="line"></div>
        <div className="space2">Pasos: {props.nodo.nro_pasos}</div>
        <div className="line"></div>
        <div className="space2">Líneas: {props.nodo.nro_lineas}</div>
        <div className="line"></div>
        <div className="space3">Descripción: {props.nodo.descripcion}</div>


    </div>
}

export default Target;
