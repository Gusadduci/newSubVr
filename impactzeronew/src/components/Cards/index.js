import "./style.scss"

function Cards(props){
   return <div className={props.className} > {props.value} </div>
}

export default Cards