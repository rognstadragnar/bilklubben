import React from 'react';

import Axios from 'axios';

import TextFieldGroup from './_common/textfieldgroup.jsx'

export default class ProfilSkjema extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            nyttBrukernavn: '',
            nyttNavn: '',
            nyEpost: '',
            currentPassord: '',
            nyttPassord: '',
            nyePoeng: '',
            errors: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePointSubmit = this.handlePointSubmit.bind(this);
    }
    componentDidMount(){
        let abonnementText;
        Axios.get('/api/getBruker')
            .then((res) => {
                switch(Number(res.data.bruker.abonnement)) {
                    case 1:
                        abonnementText = 'Gjerrigknarken';
                        break;
                    case 2:
                        abonnementText = 'Den middlemådige';
                        break;
                    case 3: 
                        abonnementText = 'Onkel Skrue';
                        break;
                    default: 
                        abonnementText = 'Du har ikke abonnement.'
                }; return res})
            .then((res) => {
                this.setState({
                    brukernavn: res.data.bruker.brukernavn,
                    fulltNavn: res.data.bruker.fulltNavn,
                    epost: res.data.bruker.email ? res.data.bruker.email : '',
                    points: res.data.bruker.points,
                    abonnement: res.data.bruker.abonnement,
                    abonnementText: abonnementText
                })
                return res
            })
            .then((res ) => console.log(res))
            .catch(err => console.log(err))
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }
    handleSubmit(e){
        console.log(window.location.href)
        e.preventDefault();
        Axios.post('/api/endre', {
            fulltNavn: this.state.nyttNavn !== '' ? this.state.nyttNavn : this.state.fulltNavn, 
            epost: this.state.nyEpost !== '' ? this.state.nyEpost : this.state.epost,
            abonnement: this.state.abonnement
        })
        .then((res) => {window.location = window.location.href;})
        .catch(err => console.log(err))
    }
    handlePointSubmit(e){
        e.preventDefault();
        if (!isNaN(Number(this.state.nyePoeng)) && Number(this.state.nyePoeng) > 0) {
            Axios.post('/api/fyll', {
            amount: Number(this.state.nyePoeng)
        })
        .then((res) => { this.setState({errors: null, points: res.data.newPoints, nyePoeng: ''})})
        .catch(err => console.log(err))
        } else {
            this.setState({errors: "wow"})
        }
        
    }
    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>{this.state.brukernavn}</p>
                    <TextFieldGroup 
                        name='nyttNavn' 
                        value={this.state.nyttNavn} 
                        placeholder={this.state.fulltNavn} 
                        onChange={this.handleChange}
                    />
                    <TextFieldGroup 
                        name='nyEpost' 
                        value={this.state.nyEpost} 
                        placeholder={this.state.epost === '' ? 'legg til epost' : this.state.epost} 
                        onChange={this.handleChange}
                    />

                    <TextFieldGroup 
                        name='passord' 
                        value={this.state.currentPassord} 
                        placeholder='nåværende passord' 
                        onChange={this.handleChange}
                    />
                    <TextFieldGroup 
                        name='nyttPassord' 
                        value={this.state.nyttPassord} 
                        placeholder='Nytt passord' 
                        onChange={this.handleChange}
                    />
                    <p>Du har abonnement: {this.state.abonnementText}</p>
                    <TextFieldGroup field='radio' value='1' name='abonnement' onChange={this.handleChange} labelName='Gjerrigknarken(249,-/mnd)'/>
                    <TextFieldGroup field='radio' value='2' name='abonnement' onChange={this.handleChange} labelName='Den middlemådige(490,-/mnd)'/>
                    <TextFieldGroup field='radio' value='3' name='abonnement' onChange={this.handleChange} labelName='Onkel Skrue(1499,-/mnd)'/>
                    <TextFieldGroup field='radio' value='0' name='abonnement' onChange={this.handleChange} labelName='Det tar vi senere.'/>
                            
                    <input type='submit' value='alslda' />
                </form>
                    <p>Legg Til Poeng. Nåværende poeng: {this.state.points}</p>
                <form onSubmit={this.handlePointSubmit}>
                    <TextFieldGroup value={this.state.nyePoeng} name='nyePoeng' onChange={this.handleChange}/>
                    {this.state.errors ? <span>Fyll inn et tall som er høyere enn 0.</span> : ''}
                    <input type='submit' value='alslda' />

                </form>

            </div>
        )
    }
}