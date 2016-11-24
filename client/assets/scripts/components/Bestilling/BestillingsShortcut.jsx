import React from 'react';
import DatePicker from 'react-pikaday-component';
import Pikaday from 'pikaday';
import Moment from 'moment';

let lol;
export default class BestillingsShortcut extends React.Component {
    constructor(){
        super()
        this.state = {startDato: false, sluttDato: false}
        this.onChangeStart = this.onChangeStart.bind(this)
        this.onChangeSlutt = this.onChangeSlutt.bind(this)
    }
    onChangeStart(val){
        this.setState({startDato: Moment(val)})
        
        lol.setMinDate(Moment(val).add(1, 'days').toDate())
    }
    onChangeSlutt(val){
        this.setState({sluttDato: Moment(val)})

        if (this.state.startDato.isValid() && this.state.sluttDato.isValid() && this.state.sluttDato.diff(this.state.startDato, 'days') > 0) {
            window.sessionStorage.setItem('bestillingsDato', {start: this.state.startDato, slutt: this.state.sluttDato})
            window.location = '/bestilling';
        }
    }
    componentDidMount(){
        window.sessionStorage.removeItem('bestillingsDato')
        new Pikaday({
            field: this.refs.start,
            format: 'MM/DD/YYYY',
            onSelect: this.onChangeStart
        });
        lol = new Pikaday({
            field: this.refs.slutt,
            format: 'MM/DD/YYYY',
            onSelect: this.onChangeSlutt
        });
    }
    render() {
        
        return (
            <div>
            <span>Å leie en bil kan, og bør, være enkelt. Hos Bilklubben trenger du bare å enten velge </span>
            <span ref='start'>startdato {this.state.startDato ? this.state.startDato.format('DD/MM/YY') : '_______'}</span>
            <span> og </span>
            <span ref='slutt'>sluttdato {this.state.sluttDato ? this.state.sluttDato.format('DD/MM/YY') : '_______'}</span>
            <span>, eller </span><span>velge bil.</span>
            {/*<BilListe shouldShow={this.state.bilListe} biler={biler}/>*/}
        </div>
        )
    }
}