
import GrapView from "../../components/Graph2d/graph"



function Graph2Export(props) {
    function valuefgref(lil) {

        props.set(lil)
    }
    function setInfoNode(r) {
        props.clickNodo(r)
    }


    return (
        <div className={props.contra}>
            <div className={props.contra2}>
                <GrapView nodeinput={props.nodein} traveler={props.travelIn} hand={valuefgref} nodeInfo={setInfoNode} newInfo={props.newData} cambios={props.cambios} />
            </div>
        </div>

    );

}

export default Graph2Export;
