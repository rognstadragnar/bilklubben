import React from 'react'
import Moment from 'moment';
require('moment-range');

export default (props) => {

    const bekreftBestilling = props.showing && props.bil && props.lengde > 0 ? 
        <div>
            <div className='bb-cont'>
                <span className='bb-bil'>{props.bil.make} {props.bil.model}</span>
                <span className='bb-lengde'>{props.lengde} døgn <span className='bb-datoer'>({props.startDato} - {props.sluttDato})</span></span>
                <span className='bb-pris'>Totalpris: {props.bil.price * props.lengde} bkp</span>
            </div>
                    </div> : 
        <div>
            <div className='bb-cont'></div>
        </div>
    return (
        <div className={props.showing && props.bil && props.lengde > 0 ? 'bekreft-bestilling showing' : 'bekreft-bestilling'}>
            <span className='bb-din-bestilling'>Din bestilling:</span>
            {bekreftBestilling}
            <div className='form-group'>
                <input type='text' name='rabatt' placeholder='Rabatt'/>
                <button className='bb-send' disabled={props.showing && props.bil && props.lengde > 0 ? false : true } onClick={()=> props.handleBestill()}>Bestilling</button>
                
            </div>
            <span className={props.error ? 'errors showing' : 'errors'}>{props.error ? props.error : null}</span>
        </div>
    )
}