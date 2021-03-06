import React from 'react';
import TextFieldGroup from './_common/textfieldgroup.jsx';
import CarouselPage from './_common/carouselPage.jsx';
import CarouselParent from './_common/carouselParent.jsx';
import Axios from 'axios';

export default class RegistreringsSkjema extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fulltNavn: '', 
            brukernavn: '', 
            passord: '',
            abonnement: false, 
            error: null,
            currentPage: 1, 
            totalPages: 3,
            page1isValid: false,
            page2isValid: true,
            page3isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goTo2 = this.goTo2.bind(this);
        this.goTo3 = this.goTo3.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }
    handleRadioChange(e){
        this.setState({ [e.target.name]: e.target.value, error: null})
    }
    handleSubmit(e){
        e.preventDefault();
        const { passord, fulltNavn, abonnement } = this.state;
        const brukernavn = this.state.ledigBrukernavn;
        if (this.state.currentPage === 3) {
            if (abonnement === false) {
                this.setState({error: 'Vennligst velg et abonnement.'})
            } 
            else if (this.state.error === null) {
                Axios.post('/api/registrer', {
                    brukernavn: brukernavn, 
                    passord: passord,
                    fulltNavn: fulltNavn,
                    abonnement: abonnement
                })    
                .then((res)=> {
                    this.setState({error: null, currentPage:4});
                    setTimeout(() => {window.location = '/?status=registrert'}, 500)
                })
                .catch((error) => {
                    this.setState({error: error.response.data.error})})
            }
        }
        
    }
    
    goTo2(e){
        e.preventDefault();
        const { brukernavn, passord, fulltNavn, ledigBrukernavn } = this.state;
        if (brukernavn === ledigBrukernavn && fulltNavn && passord) {
            this.setState({error: null, currentPage: 2})
        } else if (brukernavn && passord && fulltNavn) {
            Axios.post('/api/isbruker', {brukernavn: brukernavn})
            .then((res)=> {
                this.setState({
                    error: null, 
                    ledigBrukernavn: brukernavn,
                    currentPage: 2
                })
            })
            .catch((err) => {
                this.setState({error: err.response.data.error, ledigBrukernavn: false})
            })
        } else {
            this.setState({error: 'Fyll ut alle feltene.'})
        }
    }
    goTo3(e) {
        e.preventDefault();
        this.setState({currentPage: 3})
    }
    goBack(e) {
        e.preventDefault();
        if (this.state.currentPage > 1) this.setState({currentPage: this.state.currentPage - 1})
    }

    render(){
        return (
            <div className='registrer-parent'>
                <span id='lukk-registrering' className='lukk'></span>
                <h5>Registrering</h5>
                <form onSubmit={this.handleSubmit}>
                   <CarouselParent 
                    currentPage={this.state.currentPage} 
                    totalPages={this.state.totalPages} 
                    >
                        <CarouselPage>
                            <h6>Kontaktinformasjon</h6>
                            <TextFieldGroup value={this.state.fulltNavn} name='fulltNavn' onChange={this.handleChange} placeholder='Fullt navn*'/>
                            <TextFieldGroup value={this.state.brukernavn} name='brukernavn' onChange={this.handleChange} placeholder='Brukernavn*'/>
                            <TextFieldGroup value={this.state.passord} field='password' name='passord' onChange={this.handleChange} placeholder='Passord*'/>
                            <button type='button' onClick={this.goTo2}>Neste</button>
                        </CarouselPage>
                        <CarouselPage>
                           <h6>Betalingsinformasjon</h6>
                           <TextFieldGroup value={this.state.fulltNavn} name='kortholder' onChange={() => {}} 
                           placeholder='Navn på kortholder' disabled={true}/>
                            <TextFieldGroup value='1234-5678-9876-5432-1234' name='kortnummer' onChange={() => {}} placeholder='Kortnummer' disabled={true}/>
                            <TextFieldGroup value='01/17' name='utløpsdato' onChange={()=> {}} placeholder='Utløpsdato' disabled={true}/>
                            <TextFieldGroup value='123' name='sikkerhetskode' onChange={()=> {}} placeholder='sikkerhetskode' disabled={true}/>
                            <button type='button' onClick={this.goBack}>Forrige</button>
                            <button type='button' onClick={this.goTo3}>Neste</button>
                        </CarouselPage>
                        <CarouselPage>
                            <h6>Velg abonnement</h6>
                            <TextFieldGroup field='radio' value='1' name='abonnement' onChange={this.handleRadioChange} labelName='Gjerrigknarken(249,-/mnd)'/>
                            <TextFieldGroup field='radio' value='2' name='abonnement' onChange={this.handleRadioChange} labelName='Den middlemådige(490,-/mnd)'/>
                            <TextFieldGroup field='radio' value='3' name='abonnement' onChange={this.handleRadioChange} labelName='Onkelskrue(1499,-/mnd)'/>
                            <TextFieldGroup field='radio' value='0' name='abonnement' onChange={this.handleRadioChange} labelName='Det tar vi senere.'/>
                            <button type='button' onClick={this.goBack}>Forrige</button><input type='submit' value='Registrer meg'/>

                        </CarouselPage>
                        <CarouselPage><div className='check'></div></CarouselPage>
                       
                    </CarouselParent>
                </form>
                <span className='error'>{this.state.error ? this.state.error : ''}</span>
            </div>
        )
    }
}

