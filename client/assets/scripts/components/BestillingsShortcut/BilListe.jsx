import React from 'react';
import Axios from 'axios';

 const bilListe = ({biler, showing, select, selected, confirm}) => {

    const visBiler = biler.map(b => <li className={selected === b.id ? 'selected' : ''} onClick={() => select(b.id)}><strong>{b.make}</strong> {b.model}</li>)
    return (
        <div>
            <ul>
                {visBiler}
            </ul>
            <button onClick={(e) => {e.preventDefault();confirm()}}>Velg</button>
        </div>
    )
    
}
export default bilListe;