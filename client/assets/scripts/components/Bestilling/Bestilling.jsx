import React from 'react';
import DatePicker from 'react-pikaday-component';
import Moment from 'moment';
require('moment-range');
import Axios from 'axios';

import BilVisning from './BilVisning.jsx';
import BilInfo from './BilInfo.jsx';
import SokeFelt from './SokeFelt.jsx';


        Moment.locale('nb')

export default class Bestilling extends React.Component {
    constructor(){
        super()
        this.state = {
            //startDato: Moment(),
            //sluttDato: Moment().add(1, 'days'),
            maxDato: Moment('12/12/2999'),
            opptatteDatoer: [],
            opptatteBiler: [],
            velgBil: false
        }
        this.handleToggleBilDato = this.handleToggleBilDato.bind(this)
        this.handleBilValg = this.handleBilValg.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleSluttChange = this.handleSluttChange.bind(this)
        this.updateOpptatteBiler = this.updateOpptatteBiler.bind(this)
        this.updateOpptatteDatoer = this.updateOpptatteDatoer.bind(this)
    }

    handleStartChange(val){
        this.setState({
            maxDato: Moment('12/12/2999'),
            startDato: Moment(val),
        })
        
        if (this.state.sluttDato && !Moment(val).isBefore(this.state.sluttDato)) {
            console.log('it is')
            this.setState({
                sluttDato: Moment(val).add(1, 'days')
            })
        }
        if (!this.state.velgBil) {
            this.updateOpptatteBiler()
        }

        if (this.state.velgBil && this.state.valgtBil) {
            const dateArr = this.state.opptatteDatoer.sort((a, b) => {
                if (a > b) return 1
                else if (a > b) return -1
                else return 0
            })
            for (let i = 0; i < dateArr.length; i++) {
                console.log(dateArr[i].isSame(Moment(val)), dateArr[i].isAfter(Moment(val)))

                if (dateArr[i].isAfter(this.state.startDato)) {
                    this.setState({maxDato: dateArr[i]})
                    return true
                }   
            }
        }

    }
    handleSluttChange(val){
        console.log(this.state.startDato)
        console.log('HANDLED SLUTT CHANGE')
        if (this.state.velgBil) {
            this.setState({
                sluttDato: Moment(val)
            })
        } else {
            this.setState({
                startDato: Moment(this.state.startDato),
                sluttDato: Moment(val)
            })
            this.updateOpptatteBiler()
        }
    }

    handleToggleBilDato(){
        if (this.state.velgBil) {
            this.resetBiler()

            this.setState({
                velgBil: false,
                startDato: Moment(),
                sluttDato: Moment().add(1, 'days'),
                opptatteDatoer: []

            })
        } else {
            this.resetBiler()
            this.setState({
                velgBil: true,
                startDato: null,
                sluttDato: null,
                opptatteDatoer: []
            })
        }
    }

    handleBilValg(val){
        console.log('hop', val === this.state.valgtBil)
        if (this.state.velgBil) {
            this.updateOpptatteDatoer(val)
            this.setState({
                valgtBil: this.state.valgtBil === val ? null : val,
            })
        } else {
            this.setState({
                valgtBil: this.state.valgtBil === val ? null : val
            })
        }
        const car = this.state.biler.filter((cv) => cv.id === this.state.valgtBil ? true : false)
        console.log('111', car)
    }

    resetBiler(){
        this.setState({
            valgtBil: null,
            opptatteBiler: []
        })
    }


    updateOpptatteDatoer(val){
            console.log('UPDATE OPPTATTE DATOER')
        Axios.post('/api/finnOpptatteDatoer', {bilId: val})
        .then(res => {console.log(res.data);this.setState(
            {opptatteDatoer: res.data.opptatteDatoer.map(
                d => Moment.range(d.start, d.slutt)
            )}
        )})
    }

    updateOpptatteBiler(){
        Axios.post('/api/finnOpptatteBiler', {
            startDato: this.state.startDato ?  this.state.startDato : null, 
            sluttDato: this.state.sluttDato ? this.state.sluttDato : null
        })
        .then(res => this.setState({opptatteBiler: res.data.opptatteBiler})) //should retrun res.data.opptattebiler

    }




    componentDidMount(){
        console.log('apparently mounting')
        Axios.get('/api/getBiler')
        .then(res => this.setState({biler: res.data.biler}))
        if (window.sessionStorage.getItem('bestillingsStartDato') && 
            window.sessionStorage.getItem('bestillingsSluttDato')) {
            this.setState({
                startDato: Moment(window.sessionStorage.getItem('bestillingsStartDato')),
                sluttDato: Moment(window.sessionStorage.getItem('bestillingsSluttDato')),
            })
            setTimeout(() => this.updateOpptatteBiler(), 500)
        } else if (window.sessionStorage.getItem('bestillingsBil')) { 
            const bilen = Number(window.sessionStorage.getItem('bestillingsBil'))
            let carArr = []
            carArr.push(bilen)
            this.updateOpptatteDatoer(carArr)
            this.setState({
                velgBil: true,
                valgtBil: Number(window.sessionStorage.getItem('bestillingsBil'))
            })
        } 
    }
    render() {
        return (
            <div style={{margin: '250px 20px'}}>
                <SokeFelt 
                    toggleBil={this.handleToggleBilDato} 
                    startDato={this.state.startDato} 
                    sluttDato={this.state.sluttDato}
                    sluttDatoMin={this.state.sluttDatoMin}
                    opptatteDatoer={this.state.opptatteDatoer}
                    maxDato={this.state.maxDato}
                    handleStartChange={this.handleStartChange}
                    handleSluttChange={this.handleSluttChange}
                />
                <button onClick={this.handleToggleBilDato}>{this.state.velgBil ? 'Velg basert på dato' : 'Velg basert på bil'}</button>
                <BilVisning handleBilValg={this.handleBilValg} valgtBil={this.state.valgtBil} opptatteBiler={this.state.opptatteBiler} biler={this.state.biler}/>
                {this.state.valgtBil ? <BilInfo showing={true} bil={this.state.biler.filter(cv => cv.id == this.state.valgtBil)[0]}/> : ''}
                {/*<BekreftBestilling />*/}
            </div>
        )
    }
}