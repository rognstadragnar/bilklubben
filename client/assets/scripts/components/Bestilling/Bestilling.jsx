import React from 'react';
import DatePicker from 'react-pikaday-component';
import Moment from 'moment';
import Axios from 'axios';

import BilVisning from './BilVisning.jsx';
import SokeFelt from './SokeFelt.jsx';

export default class Bestilling extends React.Component {
    constructor(){
        super()
        this.state = {
            startMoment: null,
            sluttMoment: null,
            maxDato: Moment('2999/12/12'),
            velgBil: true
        }
        this.handleToggleBilDato = this.handleToggleBilDato.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleSluttChange = this.handleSluttChange.bind(this)
        this.updateOpptatteBiler = this.updateOpptatteBiler.bind(this)
        this.updateOpptatteDatoer = this.updateOpptatteDatoer.bind(this)
    }

    handleStartChange(val){
        if (Moment(val).isBefore(this.state.sluttDato.add(1, 'days'))) {
            this.setState({
                sluttDato: Moment(val).add(1, 'days')
            })
        }
        if (this.state.velgBil || this.state.valgtBil) {
            this.setState({
                startDato: val,
                maxDate: Moment("10/10/2999")
            })
            const dateArr = this.state.updateOpptatteDatoer.sort((a, b) => {
                if (a > b) return 1
                else if (a > b) return -1
                else return false
            })
            for (let i = 0; i < dateArr.length; i++) {
                if (dateArr[i].isSame(startDate) || dateArr[i].isAfter(startDate)) {
                    this.setState({maxdate: dateArr[i]})
                    return
                }   
            }
        } else {
            this.updateOpptatteBiler()
            this.setState({
                startDato: val
            })
        }

    /*

        if (Moment(val).isValid()) {
            console.log('chis')
        }
        const newDate = new Moment(val).add(0, 'days').toDate();
        let newDisabled = this.state.disabledDays;
        newDisabled.push(new Moment(newDate))
        this.setState({startDate: newDate, disabledDays: newDisabled})
        console.log(newDisabled, this.state)*/
    }
    handleSluttChange(val){
        if (this.state.velgBil) {
            this.setState({
                sluttDato: val
            })
        } else {
            this.updateOpptatteBiler()
            this.setState({
                sluttDato: val
            })
        }
        /*
        if (Moment(val).isValid()) {
            console.log('chis')
        }
        const newDate = new Moment(val).add(0, 'days').toDate();

        //Axios.get

        let newDisabled = this.state.disabledDays;
        newDisabled.push(new Moment(newDate))
        this.setState({dateStart: newDate, disabledDays: newDisabled})
        console.log(newDisabled, this.state)*/
    }
    handleToggleBilDato(){
        this.setState({
            velgBil: this.state.velgBil ? false : true,
            biler: this.resetBiler(),
            startDato: null,
            sluttDato: null
        })
    }
    handleBilValg(val){
        if (this.state.velgBil) {
            this.updateOpptatteDatoer(val)
            this.setState({
                valgtBil: val
            })
        } else {
            this.setState({
                valgtBil: val
            })
        }
    }


    updateOpptatteDatoer(val){
        Axios.get('/api/finnOpptatteDatoer', {bilId: val})
        .then(res => {
            this.setState({
                opptatteDatoer: res.data.opptatteDatoer,
                opptatteBiler: null
            })
        })
    }
    updateOpptatteBiler(){
        Axios.get('/api/finnOpptatteBiler', {startDato: this.state.StartDato, sluttDato: this.state.sluttDato})
        .then(res => {
            this.setState({
                opptatteBiler: res.data.opptatteBiler,
                opptatteDatoer: null
            })
        })
    }




    componentWillMount(){
        if (window.sessionStorage.getItem('bestillingsStartDato') && 
            window.sessionStorage.getItem('bestillingsSluttDato')) {
            this.setState({
                startDato: Moment(window.sessionStorage.getItem('bestillingsStartDato')) || Moment(),
                sluttDato: Moment(window.sessionStorage.getItem('bestillingsSluttDato')) || Moment().add(1, days),
            })
        } else if (window.sessionStorage.getItem('bestillingsBil')) { 
            this.setState({
                startDato: Moment(window.sessionStorage.getItem('bestillingsStartDato')) || Moment(),
                sluttDato: Moment(window.sessionStorage.getItem('bestillingsSluttDato')) || Moment().add(1, days),
            })
        } 
        Moment.locale('nb')
    }
    render() {
        return (
            <div style={{margin: '250px 20px'}}>
                <SokeFelt 
                    toggleBil={this.handleToggleBilDato} 
                    startDato={Moment(this.state.startDato)} 
                    sluttDato={Moment(this.state.sluttDato)}
                    sluttDatoMin={this.state.sluttDatoMin}
                    maxDato={this.state.maxDato}
                    handleStartChange={this.state.handleStartChange}
                    handleSluttChange={this.state.handleSluttChange}
                />
                {/*<BilVisning biler={[{id: 1},{id: 2},{id: 3}]}/>
                <BilInfo />
                <BekreftBestilling />*/}
            </div>
        )
    }
}