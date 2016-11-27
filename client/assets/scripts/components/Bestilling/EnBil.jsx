import React from 'react';


export default class EnBil extends React.Component{

    render(){
        const classes = this.props.isDisabled ? 'disabled ' : this.props.isValgt ? ' valgt' : ''
        return (
            <div className={ this.props.isDisabled ? 'en-bil disabled ' : this.props.isValgt ? 'en-bil valgt' : 'en-bil'}>
                <div className='en-bil-img' style={{backgroundImage: 'url(/assets/img/biler/' + this.props.bil.id + '/' + this.props.bil.imgsm +')'}} />
                <div className='en-bil-desc'>
                    <span>{this.props.bil.year + ' ' + this.props.bil.make + ' - ' + this.props.bil.model}</span>
                    <span>{this.props.bil.price} BK-poeng</span>
                </div>
                <div className='en-bil-overlay'>
                    <div className='en-bil-velg' onClick={(e) => {e.stopPropagation(); this.props.isDisabled ? null : this.props.handleClick(this.props.bil.id)}}></div>
                    <div className='en-bil-info' onClick={(e) => {e.stopPropagation(); this.props.handleVisInfo(this.props.bil.id)}}></div>
                </div>
            </div>
        )
    }
}