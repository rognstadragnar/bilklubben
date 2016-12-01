import React from 'react';

import Axios from 'axios';

import TextFieldGroup from './_common/textfieldgroup.jsx'

export default class ProfilSkjema extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            nyttBrukernavn: '',
            brukernavn: '',
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
            .catch(err => this.setState({error: err.response.data.error}))
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }
    handleSubmit(e){
        console.log(window.location.href)
        e.preventDefault();
        if (this.state.nyEpost !== '' && !this.state.nyEpost.match(/^[\w\.\+\_]+\@\w+\.[a-z]+$/i)) {
            return this.setState({errors: 'Ugyldig epost'})
        }
        if ((this.state.nyttPassord !== '' && this.state.currentPassord === '') || (this.state.currentPassord !== '' && this.state.nyttPassord === '')) {
            return this.setState({errors: 'Begge feltene må fylles inn'})
        }
        Axios.post('/api/endre', {
            fulltNavn: this.state.nyttNavn !== '' ? this.state.nyttNavn : this.state.fulltNavn, 
            epost: this.state.nyEpost !== '' ? this.state.nyEpost : this.state.epost,
            passord: this.state.currentPassord !== '' ? this.state.currentPassord : null,
            nyttPassord: this.state.nyttPassord !== '' ? this.state.nyttPassord : null,
            abonnement: this.state.abonnement
        })
        .then((res) => {window.location = window.location.href;})
        .catch(err => this.setState({errors: err.response.data.error}))
    }
    handlePointSubmit(e){
        e.preventDefault();
        if (!isNaN(Number(this.state.nyePoeng)) && Number(this.state.nyePoeng) > 0) {
            Axios.post('/api/fyll', {
            amount: Number(this.state.nyePoeng)
        })
        .then((res) => { this.setState({errors: null, points: res.data.newPoints, nyePoeng: ''})})
        .catch(err => {this.setState({error: err.response.data.error})})
        } else {
            this.setState({errors: "wow"})
        }
        
    }
    render () {
        return (
            <div className='profil'>
                <h2>Min side</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='profil-endre-informasjon'>
                        <div className='profil-section-content'>
                            <h4>Endre min informasjon</h4>
                                <h6>Kontaktinformasjon</h6>
                                <TextFieldGroup 
                                    name='Brukernavn' 
                                    placeholder={this.state.brukernavn}
                                    value={this.state.brukernavn} 
                                    labelName='Brukernavn'
                                    onChange={() => {}}
                                    disabled={true}
                                />
                                <TextFieldGroup 
                                    name='nyttNavn' 
                                    value={this.state.nyttNavn} 
                                    placeholder={this.state.fulltNavn} 
                                    labelName='Fullt navn'
                                    onChange={this.handleChange}
                                />
                                <TextFieldGroup 
                                    name='nyEpost' 
                                    value={this.state.nyEpost} 
                                    placeholder={this.state.epost === '' ? 'legg til epost' : this.state.epost}
                                    labelName='E-postadresse'
        
                                    onChange={this.handleChange}
                                />
                                <h6>Passord</h6>
                                <TextFieldGroup 
                                    name='currentPassord' 
                                    value={this.state.currentPassord} 
                                    field='password'
                                    labelName='Nåverende passord'
                                    onChange={this.handleChange}
                                />
                                <TextFieldGroup 
                                    name='nyttPassord' 
                                    value={this.state.nyttPassord} 
                                    field='password'
                                    labelName='Nytt passord'
                                    onChange={this.handleChange}
                                />
                                <span className='error'>{this.state.errors ? this.state.errors : ''}</span>
                                <input type='submit' value='Bekfreft' />
                            </div>
                    </div>
                    <div className='profil-endre-abonnement'>
                        <div className='profil-section-content'>
                            <h4>Endre mitt abonnement</h4>
                            <span className='profil-current'>Mitt abonnement: {this.state.abonnementText}</span>
                            <TextFieldGroup field='radio' value='1' name='abonnement' onChange={this.handleChange} labelName='Gjerrigknarken(249,-/mnd)'/>
                            <TextFieldGroup field='radio' value='2' name='abonnement' onChange={this.handleChange} labelName='Den middlemådige(490,-/mnd)'/>
                            <TextFieldGroup field='radio' value='3' name='abonnement' onChange={this.handleChange} labelName='Onkel Skrue(1499,-/mnd)'/>
                            <input type='submit' value='Bekreft' />
                        </div>     
                    </div>     
                </form>
                <div className='profil-legg-til'>
                    <div className='profil-section-content'>
                        <h4>Legg til flere BK-poeng</h4>
                        <span className='profil-current'>Mine poeng: {this.state.points}</span>
                        <form onSubmit={this.handlePointSubmit}>
                            <TextFieldGroup value={this.state.nyePoeng} field='number' labelName='Legg til' name='nyePoeng' onChange={this.handleChange}/>
                            {this.state.errors ? <span className='error'>Fyll inn et tall som er høyere enn 0.</span> : ''}
                            <input type='submit' value='Bekreft' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}