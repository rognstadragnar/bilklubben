import React from 'react';
import DatePicker from 'react-pikaday-component';
import Pikaday from 'pikaday';
import Moment from 'moment';
import Axios from 'axios';
import BilListe from './BilListe';

let lol;
export default class BestillingsShortcut extends React.Component {
    constructor(){
        super()
        this.state = {
            startDato: false, 
            sluttDato: false, 
            startDatoClass: '', 
            sluttDatoClass: '', 
            biler: []
        }
        this.onChangeStart = this.onChangeStart.bind(this)
        this.onChangeSlutt = this.onChangeSlutt.bind(this)
        this.handleShowCar = this.handleShowCar.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleConfirmBil = this.handleConfirmBil.bind(this)
    }
    onChangeStart(val){
        this.setState({startDato: Moment(val)})
        lol.setMinDate(Moment(val).add(1, 'days').toDate())
    }
    onChangeSlutt(val){
        this.setState({sluttDato: Moment(val)})

        if (this.state.startDato.isValid() && this.state.sluttDato.isValid() && this.state.sluttDato.diff(this.state.startDato, 'days') > 0) {
            window.sessionStorage.setItem('bestillingsStartDato', this.state.startDato)
            window.sessionStorage.setItem('bestillingsSluttDato', this.state.sluttDato)
            window.location = '/bestilling';
        }
    }
    
    handleShowCar(){
        Axios.get('/api/getbiler')
        .then(res => this.setState({biler: res.data.biler}))
        .then(console.log(this.state.biler))
    }
    handleSelect(val){
        this.setState({selected: val})
        console.log(val, 'triggered')
    }
    handleConfirmBil(){
                    console.log('triggered11')

        if (this.state.selected) {
            console.log('triggered')
            window.sessionStorage.setItem('bestillingsBil', this.state.selected)
            window.location = '/bestilling';
        }
    }
    componentDidMount(){
        window.sessionStorage.removeItem('bestillingsStartDato')
        window.sessionStorage.removeItem('bestillingsSluttDato')
        window.sessionStorage.removeItem('bestillingsBilId')

        const i18n = {
            previousMonth : 'Forrige måned',
            nextMonth     : 'Next måned',
            months        : ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
            weekdays      : ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
            weekdaysShort : ['Søn','Man','Tirs','Ons','Tho','Fre','Lør']}


        new Pikaday({
            field: this.refs.start,
            format: 'MM/DD/YYYY',
            onSelect: this.onChangeStart,
            onOpen: () => this.setState({startDatoClass: 'active'}),
            onClose: () => this.setState({startDatoClass: ''}),
            i18n: i18n,
            firstDay: 1

        });
        lol = new Pikaday({
            field: this.refs.slutt,
            format: 'MM/DD/YYYY',
            onSelect: this.onChangeSlutt,
            onOpen: () => this.setState({sluttDatoClass: 'active'}),
            onClose: () => this.setState({sluttDatoClass: ''}),
            i18n: i18n,
            firstDay: 1   
        });
    }
    render() {
        
        return (
            <div>
            <span>Å leie en bil hos Bilklubben er enkelt, slik det skal være. La oss starte med velge </span>
            <span className={this.state.startDatoClass + (this.state.startDato ? ' dirty' : '')} ref='start'>startdato {this.state.startDato ? this.state.startDato.format('DD/MM/YY') : '_______'}</span>
            <span> og </span>
            <span className={this.state.sluttDatoClass + (this.state.sluttDato ? ' dirty' : '')} ref='slutt'>sluttdato {this.state.sluttDato ? this.state.sluttDato.format('DD/MM/YY') : '_______'}</span>
            <span>, eller </span><span onClick={this.handleShowCar}>velge bil.</span>
            {<BilListe confirm={this.handleConfirmBil} selected={this.state.selected} select={this.handleSelect} shouldShow={this.state.bilListe} biler={this.state.biler}/>}
        </div>
        )
    }
}