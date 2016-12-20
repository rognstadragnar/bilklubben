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
        let shouldShow;
        this.state.showing === true ? shouldShow = false : shouldShow = true;
        this.setState({showing: shouldShow})
    }
    render(){
        
        
        return (                
            <tr className={this.state.showing ? 'showing': ''} onClick={this.handleShowClick}>
                <td>{this.props.ordreDato.format('DD.MM.YYYY')}</td>
                <td>
                
                    <span className='ordre-info-main'>{Moment.range(this.props.startDato, this.props.sluttDato).diff('days')} døgn x {this.props.bilNavn}</span>
                    <span className='ordre-info-dato'>{this.props.startDato.format('ll')} - {this.props.sluttDato.format('ll')}</span>
                </td>
                <td className='ordre-pris'>{this.props.kostnad}</td>
            </tr>
        )
    }
}
