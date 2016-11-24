import React from 'react';
import DatePicker from 'react-pikaday-component';
import Moment from 'moment';


import BilVisning from './BilVisning.jsx';

export default class BestillingsShortcut extends React.Component {
    constructor(){
        super()
        this.state = {
            startMoment: new Moment(),
            sluttMoment: new Moment(),
            dateStart: new Moment('2016-11-26').toDate(),
            dateSlutt: new Moment().add(1, 'days').toDate(),
            disabledDays: [],
        }
        this.onDateChange = this.onDateChange.bind(this)
        this.handleSelVal = this.handleSelVal.bind(this)
        this.disableDayFn = this.disableDayFn.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }
    onBlur(){
        console.log('asd')
    }
    onDateChange(val){
        if (Moment(val).isValid()) {
            console.log('chis')
        }
        const newDate = new Moment(val).add(0, 'days').toDate();
        let newDisabled = this.state.disabledDays;
        newDisabled.push(new Moment(newDate))
        this.setState({dateStart: newDate, disabledDays: newDisabled})
        console.log(newDisabled, this.state)
    }
    handleSelVal(e) {
        this.setState({selVal: e.target.value})
    }
    disableDayFn(day) {
        for (let i = 0; i < this.state.disabledDays.length; i++) {
            if (Moment(day).diff(this.state.disabledDays[i], 'days') === 0) {
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
                format="DD/MM/YYYY"
                minDate={new Moment('2015-11-23').toDate()}
                maxDate={this.state.dateStart}
                value={this.state.dateStart}
                i18n={i18n}
                firstDay={1}
                onChange={this.onDateChange}
            />
            <DatePicker 
                placeholder="Velg sluttdato"
                format="YYYY/MM/DD"
                minDate={new Moment('2015-11-23').toDate()}
                maxDate={this.state.dateSlutt}
                value={this.state.dateSlutt}
                i18n={i18n}
                disableDayFn={this.disableDayFn}
                firstDay={1}
            />
            <select value={this.state.selVal} onChange={this.handleSelVal}>
                <option value='' disabled>welb</option>
                <option value='asd'>asd</option>
                <option value='aasd'>aasd</option>
                <option value='aaasd'>aaasd</option>
            </select>
            <BilVisning biler={[{id: 1},{id: 2},{id: 3}]}/>
        </div>
        )
    }
}