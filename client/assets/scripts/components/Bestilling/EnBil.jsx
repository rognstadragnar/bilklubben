import React from 'react';


export default class EnBil extends React.Component{

    render(){
        return (
            <div className={this.props.disabled ? 'disabled' : this.props.valgt ? 'valgt' : ''}>
                <img src={'/assets/img/biler/' + this.props.bilId + '/liten.jpg'} />
            </div>
        )
    }
}