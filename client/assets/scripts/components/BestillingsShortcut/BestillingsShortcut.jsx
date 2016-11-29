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
            startDato: '', 
            sluttDato: '', 
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
        this.setState({shouldShow: this.state.shouldShow ? false : true})
        if (!this.state.biler.length){Axios.get('/api/getbiler')
        .then(res => this.setState({biler: res.data.biler}))}
    }
    handleSelect(val){
        this.setState({selected: val})
    }
    handleConfirmBil(){
        if (this.state.selected) {
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
            minDate: Moment().toDate(),
            onSelect: this.onChangeStart,
            onOpen: () => this.setState({startDatoClass: 'active'}),
            onClose: () => this.setState({startDatoClass: ''}),
            i18n: i18n,
            firstDay: 1

        });
        lol = new Pikaday({
            field: this.refs.slutt,
            format: 'MM/DD/YYYY',
            minDate: Moment().add(1, 'day').toDate(),
            onSelect: this.onChangeSlutt,
            onOpen: () => this.setState({sluttDatoClass: 'active'}),
            onClose: () => this.setState({sluttDatoClass: ''}),
            i18n: i18n,
            firstDay: 1   
        });
    }
    render() {
        
        return (
            <div className='bestillings-shortcut'>
            <span className='linje-1'>Jeg vil leie bil fra 
                <span className={this.state.startDatoClass + (this.state.startDato ? 'dato dirty' : 'dato')} ref='start'>{this.state.startDato ? this.state.startDato.format('LL') : 'superplaceholder'}</span>
            </span>
            <span className='linje-2'>
                <span>til og med </span>
                <span className={this.state.sluttDatoClass + (this.state.sluttDato ? 'dato dirty' : 'dato')} ref='slutt'>{this.state.sluttDato ? this.state.sluttDato.format('LL') : 'superplaceholder'}</span>.
            </span>
        </div>
        )
    }
}