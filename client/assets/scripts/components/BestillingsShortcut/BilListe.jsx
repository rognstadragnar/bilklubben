import React from 'react';
import Axios from 'axios';

 const bilListe = ({biler, shouldShow, select, selected, confirm}) => {

    const visBiler = biler.map(b => <li className={selected === b.id ? 'selected' : ''} onClick={() => select(b.id)}><strong>{b.make}</strong> {b.model}</li>)
    return (
        <div className={shouldShow ? 'bil-liste showing' : 'bil-liste'}>
            {shouldShow ?
                <div class-liste='bil-liste-content'>
            <ul>
                {visBiler}
            </ul>
            <button onClick={(e) => {e.preventDefault();confirm()}}>Velg</button></div> : null}
        </div>
    )
    
}
export default bilListe;