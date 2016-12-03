import React from 'react';
import DatePicker from 'react-pikaday-component';
import Moment from 'moment';
require('moment-range');
import Axios from 'axios';

import BilVisning from './BilVisning.jsx';
import BilInfo from './BilInfo.jsx';
import SokeFelt from './SokeFelt.jsx';
import BekreftBestilling from './BekreftBestilling.jsx';


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
            velgBil: false,
            visInfo: false,
            error: null,
        }
        this.handleToggleBilDato = this.handleToggleBilDato.bind(this)
        this.handleBilValg = this.handleBilValg.bind(this)
        this.handleVisInfo = this.handleVisInfo.bind(this)
        this.handleBestill = this.handleBestill.bind(this)
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
            this.setState({
                sluttDato: Moment(val).add(1, 'days')
            })
        }
        
        this.updateOpptatteBiler()
        
        if (this.state.valgtBil) {
            const dateArr = this.state.opptatteDatoer.sort((a, b) => {
                if (a > b) return 1
                else if (a > b) return -1
                else return 0
            })
            for (let i = 0; i < dateArr.length; i++) {
                if (Moment(dateArr[i].start).isAfter(Moment(val)) ||
                    Moment(dateArr[i].end).isAfter(Moment(val))) {

                    this.setState({maxDato: dateArr[i].start})
                    return;
                }   
            }
        }

    }
    handleSluttChange(val){
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
        this.resetBiler()
        this.setState({
            velgBil: false,
            startDato: null,
            sluttDato: null,
            maxDato: null,
            opptatteDatoer: [],
            opptatteBiler: [],
            error: null
        })
    }

    handleBilValg(val){
        
        this.updateOpptatteDatoer(val)
        this.setState({
            valgtBil: this.state.valgtBil === val ? null : val,
        })
        
        if (this.state.startDato) {
            const dateArr = this.state.opptatteDatoer.sort((a, b) => {
                if (a > b) return 1
                else if (a > b) return -1
                else return 0
            })
            for (let i = 0; i < dateArr.length; i++) {
                if (Moment(dateArr[i].start).isAfter(Moment(this.state.startDato)) ||
                    Moment(dateArr[i].end).isAfter(Moment(this.state.startDato))) {

                    this.setState({maxDato: dateArr[i].start})
                    return;
                }   
            }
        }
        
    }

    resetBiler(){
        this.setState({
            valgtBil: null,
            opptatteDatoer: []
        })
    }
    handleVisInfo(val){
        this.setState({
            visInfo: val
        })
    }


    updateOpptatteDatoer(val){
        Axios.post('/api/finnOpptatteDatoer', {bilId: val})
        .then(res => {this.setState(
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
        .then(res => this.setState({opptatteBiler: res.data.opptatteBiler}))
        .then(()=> {if (this.state.valgtBil && this.state.opptatteBiler.indexOf(this.state.valgtBil) >= 0) {
                this.setState({valgtBil: null})
            }}) //should retrun res.data.opptattebiler
    }

    handleBestill(){
        if (Moment(this.state.startDato).isValid() && Moment(this.state.sluttDato).isValid && this.state.valgtBil) {
            Axios.post('/api/bestill', {startDato: this.state.startDato, sluttDato: this.state.sluttDato, bil: this.state.valgtBil})
            .then(() => window.location = '/profil?status=bestilt')
            .catch(err => this.setState({error: err.response.data.error}))
        }
    }


    componentWillMount(){
        Axios.get('/api/getBiler')
        .then(res => this.setState({biler: res.data.biler}))
        if (window.sessionStorage.getItem('bestillingsStartDato') && 
            window.sessionStorage.getItem('bestillingsSluttDato')) {
            this.setState({
                startDato: Moment(window.sessionStorage.getItem('bestillingsStartDato')),
                sluttDato: Moment(window.sessionStorage.getItem('bestillingsSluttDato')),
            })
            this.updateOpptatteBiler();
            setTimeout(() => this.updateOpptatteBiler(), 500)
        } else if (window.sessionStorage.getItem('bestillingsBil')) { 
            const bilen = Number(window.sessionStorage.getItem('bestillingsBil'))
            let carArr = []
            carArr.push(bilen)
            this.updateOpptatteDatoer(bilen)
            this.setState({
                velgBil: true,
                valgtBil: Number(window.sessionStorage.getItem('bestillingsBil'))
            })
        }
    }
    componentDidMount(){
        if (window.sessionStorage.getItem('bestillingsStartDato')) window.sessionStorage.removeItem('bestillingsStartDato')
        if (window.sessionStorage.getItem('bestillingsSluttDato')) window.sessionStorage.removeItem('bestillingsSluttDato')
        if (window.sessionStorage.getItem('bestillingsBil')) window.sessionStorage.removeItem('bestillingsBil')
    }
    render() {
        return (
            <div className='bestilling-content'>
                <div className='sidebar'>
                    <SokeFelt 
                        toggleBil={this.handleToggleBilDato} 
                        startDato={this.state.startDato} 
                        sluttDato={this.state.sluttDato}
                        sluttDatoMin={this.state.sluttDatoMin}
                        opptatteDatoer={this.state.opptatteDatoer}
                        maxDato={this.state.maxDato}
                        handleStartChange={this.handleStartChange}
                        handleSluttChange={this.handleSluttChange}
                        handleToggle={this.handleToggleBilDato} 
                        toggleHva={this.state.velgBil ? 'Reset' : 'Reset'} 
                    />
                    {<BekreftBestilling 
                        showing={this.state.valgtBil && Moment(this.state.startDato).isValid() && Moment(this.state.sluttDato).isValid() ? true : false} 
                        bil={this.state.valgtBil && this.state.biler ? this.state.biler.filter(cv => cv.id === this.state.valgtBil)[0] : null}
                        lengde={Moment(this.state.startDato).isValid() && Moment(this.state.sluttDato).isValid ? Moment.range(Moment(this.state.startDato), Moment(this.state.sluttDato)).diff('days') : null}
                        startDato={this.state.startDato ? this.state.startDato.format('Do MMM') : null}
                        sluttDato={this.state.sluttDato ? this.state.sluttDato.format('Do MMM') : null}
                        handleBestill={this.handleBestill} 
                        error={this.state.error}
                    />}
                </div>
                <div className='main'>
                    <BilVisning handleVisInfo={this.handleVisInfo} handleBilValg={this.handleBilValg} valgtBil={this.state.valgtBil} opptatteBiler={this.state.opptatteBiler} biler={this.state.biler}/>
                    {this.state.visInfo ? 
                        <div className='bil-info showing' onClick={() => this.handleVisInfo(false)}><BilInfo showing={true} handleLukk={this.handleVisInfo} bil={this.state.biler.filter(cv => cv.id == this.state.visInfo)[0]}/></div> :
                        <div className='bil-info'></div>
                    }
                </div>
            </div>
        )
    }
}