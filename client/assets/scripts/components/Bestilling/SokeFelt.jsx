import React from 'react';
import Pikaday from 'pikaday';
import Moment from 'moment';
require('moment-range');


let startPicker, sluttPicker
export default class BestillingsShortcut extends React.Component {
    constructor(){
        super()
        this.disableDayFn = this.disableDayFn.bind(this)
    }

    disableDayFn(day) {
        if (!this.props.opptatteDatoer) return false
        for (let i = 0; i < this.props.opptatteDatoer.length; i++) {
            if (Moment(day).within(this.props.opptatteDatoer[i])) return true
        }
    }

    componentDidMount(){
        const i18n =  {
            previousMonth : 'Forrige måned',
            nextMonth     : 'Next måned',
            months        : ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
            weekdays      : ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
            weekdaysShort : ['Søn','Man','Tirs','Ons','Tho','Fre','Lør']
        }


        startPicker = new Pikaday({
            placeholder: "Velg startdato",
            format: "LL",
            minDate: Moment().toDate(),
            defaultDate: this.props.startDato ? this.props.startDato.toDate() : null,
            setDefaultDate: true,
            onSelect: (v) => {this.props.handleStartChange(v);},
            disableDayFn: this.disableDayFn,
            i18n: i18n,
            firstDay: 1,

            field: this.refs.startPickerDiv,

        })

        sluttPicker = new Pikaday({
            placeholder: "Velg sluttdato",
            format: "LL",
            minDate: this.props.startDato ? Moment(this.props.startDato).add(1, 'days').toDate() : Moment().add(1, 'days').toDate(),
            maxDate: this.props.maxDato.toDate() ? this.props.maxDato.toDate() : new Date('12/12/2999'),
            defaultDate: this.props.sluttDato ? this.props.sluttDato.toDate() : null,
            setDefaultDate: true,
            onSelect: (v) => {this.props.handleSluttChange(v); console.log(this.props.startDato)},
            onOpen: (v) => {this.props.startDato ? 
                sluttPicker.setMinDate(Moment(this.props.startDato).add(1, 'days').toDate()) : 
                sluttPicker.setMinDate(Moment().add(1, 'days').toDate());  
                sluttPicker.setMaxDate(this.props.maxDato.toDate()); },
            i18n: i18n,
            disableDayFn: this.disableDayFn,
            firstDay: 1,
            field: this.refs.sluttPickerDiv,

        })
        sluttPicker.setDate(null)

    }
    
    render() {
        
        return (
            <div>
                <div style={{height: '50px', width: '150px', background: 'red'}}ref='startPickerDiv'>{this.props.startDato ? this.props.startDato.format('LL') : 'Velg startdato'}</div>
                <div style={{height: '50px', width: '150px', background: 'yellow'}}ref='sluttPickerDiv'>{this.props.sluttDato ? this.props.sluttDato.format('LL') : 'Velg sluttdato'} </div>
                <button>Søk</button>
        </div>
        )
    }
}