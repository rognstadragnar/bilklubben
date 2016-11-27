import React from 'react'
import Moment from 'moment';
require('moment-range');

export default (props) => {

    const bekreftBestilling = props.showing && props.bil && props.lengde > 0 ? <div>
            <span className='bb-din-bestilling'>Din bestilling:</span>
            <span className='bb-bil'>{props.bil.year} {props.bil.make} {props.bil.model}</span><span className='bb-lengde'> á {props.lengde} døgn ({props.startDato} - {props.sluttDato})</span>
            <span className='bb-pris'>{props.bil.price * props.lengde} BK-poeng</span>
            <button className='bb-send' disabled={props.showing ? false : true} onClick={()=> props.handleBestill()}>Fullfør bestilling</button>
        </div> : 
        <div>
            <span className='bb-din-bestilling'>Din bestilling:</span></div>
    return (
        <div className={props.showing && props.bil && props.lengde > 0 ? 'bekreft-bestilling showing' : 'bekreft-bestilling'}>{bekreftBestilling}</div>
    )
}