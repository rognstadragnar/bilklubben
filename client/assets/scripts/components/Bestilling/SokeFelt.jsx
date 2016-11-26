import React from 'react';
import Pikaday from 'pikaday';
import Moment from 'moment';


let startPicker, sluttPicker
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
            minDate: this.props.startDato ? this.props.startDato.toDate() : new Date(null),
            value: this.props.startDato.toDate(),

            defaultDate: this.props.startDato.toDate(),
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
            minDate: this.props.startDato.toDate() ? this.props.startDato.add(1, 'days').toDate() : new Date(null),
            maxDate: this.props.maxDato.toDate() ? this.props.maxDato.toDate() : new Date('12/12/2999'),
            //defaultDate: this.props.sluttDato.toDate(),
            onSelect: (v) => {this.props.handleSluttChange(v)},
            onOpen: (v) => {sluttPicker.setMinDate(this.props.startDato.toDate());  sluttPicker.setMaxDate(this.props.maxDato.toDate()); },
            //setDefaultDate: true,
            i18n: i18n,
            disableDayFn: this.disableDayFn,
            firstDay: 1,
            field: this.refs.sluttPickerDiv,

        })
        console.log(this.props.startDato)
    }
    
    render() {
        
        return (
            <div>
                <div style={{height: '50px', width: '150px', background: 'red'}}ref='startPickerDiv'>{this.props.startDato ? this.props.startDato.format('LL') : ''}</div>
                <div style={{height: '50px', width: '150px', background: 'yellow'}}ref='sluttPickerDiv'>{this.props.sluttDato ? this.props.sluttDato.format('LL') : ''} </div>
                <button>Søk</button>
        </div>
        )
    }
}