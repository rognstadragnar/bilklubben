import React from 'react';
import DatePicker from 'react-pikaday-component';
import Moment from 'moment';



export default class BestillingsShortcut extends React.Component {
    constructor(){
        super()
        this.disableDayFn = this.disableDayFn.bind(this)
    }

    disableDayFn(day) {
        if (!this.props.opptatteDatoer) return false
        for (let i = 0; i < this.props.opptatteDatoer.length; i++) {
            if (Moment(day).diff(this.props.opptatteDatoer[i], 'days') === 0) {
                return true
            }
        }
    }
    
    render() {
        const i18n =  {
            previousMonth : 'Forrige måned',
            nextMonth     : 'Next måned',
            months        : ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
            weekdays      : ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
            weekdaysShort : ['Søn','Man','Tirs','Ons','Tho','Fre','Lør']
        }
        return (
            <div>
            <DatePicker 
                placeholder="Velg startdato"
                format="LL"
                minDate={this.props.startDato ? this.props.startDato.toDate() : new Date(null)}
                value={this.props.startDato.toDate()}
                onChange={this.props.handleStartChange}
                disableDayFn={this.disableDayFn}
                i18n={i18n}
                firstDay={1}
            />
            <DatePicker 
                placeholder="Velg sluttdato"
                format="LL"
                minDate={this.props.startDato.toDate() ? this.props.startDato.add(1, 'days').toDate() : new Date(null)}
                maxDate={this.props.maxDato ? this.props.maxDato.toDate() : new Date()}
                value={this.props.sluttDato.toDate()}
                onChange={this.props.handleSluttChange}
                i18n={i18n}
                disableDayFn={this.disableDayFn}
                firstDay={1}

            />
            <button>Søk</button>
        </div>
        )
    }
}