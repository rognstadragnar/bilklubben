import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
require('moment-range');

export default class EnOrdre extends React.Component {
    constructor(){
        super()
        this.state = {
            showing: false
        }
        this.handleShowClick = this.handleShowClick.bind(this)
    }
    handleShowClick(){
        console.log('asd')
        let shouldShow;
        this.state.showing === true ? shouldShow = false : shouldShow = true;
        this.setState({showing: shouldShow})
    }
    render(){
        
        
        return (
            <div className={this.state.showing ? 'showing': ''} onClick={this.handleShowClick}>
                <span>{this.props.bilId}: {this.props.bilNavn}</span>
                <div className='ordre-more-info'>
                    <span>Ordreinfo</span>
                    <p>{this.props.startDato}(start) - {this.props.sluttDato}(slutt) (lengde: {Moment.range(this.props.startDato, this.props.sluttDato).diff('days') + 1})</p>
                    <p>Kostnad: {this.props.kostnad} poeng. {this.props.ordreDato}</p>
                    <span onClick={(e) => {e.stopPropagation(); this.props.handleStatusClick(this.props.bilId)}}>Mer info</span>
                </div>
            </div>
        )
    }
}
