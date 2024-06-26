import "./style.scss"
import { useState } from 'react';

function Nav(props) {



   function handleChange(e) {
      const { value } = e.target
      props.change(value)

   }

   return (
      <div>
         <input className={props.className} placeholder={props.infoSearch} onChange={handleChange} type="text"/>

      </div>
   )


}

export default Nav;