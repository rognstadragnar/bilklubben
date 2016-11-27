import React from 'react'


export default (props) => {
    const bilen = props.valgtBil ? props.biler.filter(cv => cv.id === props.valgtBil) : null
    return (
        <div className={'bil-info showing'}><h1>{props.bil.make}</h1></div>
    )
}