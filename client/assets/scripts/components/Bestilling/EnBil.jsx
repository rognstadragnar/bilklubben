import React from 'react';


export default class EnBil extends React.Component{

    render(){
        const classes = this.props.isDisabled ? 'disabled ' : this.props.isValgt ? ' valgt' : ''
        return (
            <div onClick={()=> this.props.handleClick(this.props.bil.id)} className={ this.props.isDisabled ? 'disabled ' : this.props.isValgt ? ' valgt' : ''}>
                <img src={'/assets/img/biler/' + this.props.bil.id + '/' + this.props.bil.imgsm} />
                <h3>{this.props.bil.year + ' ' + this.props.bil.make + ' - ' + this.props.bil.model}</h3>
            </div>
        )
    }
}