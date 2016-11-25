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
            velgBil: true
        }
        this.handleToggleBilDato = this.handleToggleBilDato.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleSluttChange = this.handleSluttChange.bind(this)
        this.updateOpptatteBiler = this.updateOpptatteBiler.bind(this)
        this.updateOpptatteDatoer = this.updateOpptatteDatoer.bind(this)
    }

    handleStartChange(val){
        if (this.state.velgBil) {
            this.setState({
                startDato: val
            })
        } else {
            this.updateOpptatteBiler()
            this.setState({
                startDato: val
            })
        }


        if (Moment(val).isValid()) {
            console.log('chis')
        }
        const newDate = new Moment(val).add(0, 'days').toDate();
        let newDisabled = this.state.disabledDays;
        newDisabled.push(new Moment(newDate))
        this.setState({startDate: newDate, disabledDays: newDisabled})
        console.log(newDisabled, this.state)
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
        this.setState({
            sessStartDato: Moment(window.sessionStorage.getItem('bestillingsStartDato')),
            sessSluttDato: Moment(window.sessionStorage.getItem('bestillingsSluttDato')),
            sessBil: Number(window.sessionStorage.getItem('bestillingsBil'))
        })
        console.log(window.sessionStorage.getItem('bestllingsBil'))
    }
    render() {
        return (
            <div style={{margin: '250px 20px'}}>
                <SokeFelt 
                    toggleBil={this.handleToggleBilDato} 
                    startDato={this.state.startDato} 
                    sluttDato={this.state.sluttDato}
                    sluttDatoMin={this.state.sluttDatoMin}
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