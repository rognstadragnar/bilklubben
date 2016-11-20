import React from 'react';
import TextFieldGroup from './_common/textfieldgroup.jsx';
import CarouselPage from './_common/carouselPage.jsx';
import CarouselParent from './_common/carouselParent.jsx';
import Axios from 'axios';

export default class RegistreringsSkjema extends React.Component {
    constructor(props){
        super(props);
        this.state = {brukernavn: '', passord: '', error: '', currentPage: 1, totalPages: 3}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToPage = this.goToPage.bind(this);

    }
    handleChange(e){
        const dirty = [e.target.name] + 'Dirty';
        let isDirty = '';
        e.target.value !== '' ? isDirty = 'dirty' : isDirty = '';
        this.setState({ [e.target.name]: e.target.value, [dirty]: isDirty})
    }
    handleSubmit(e){
        e.preventDefault();
        /*Axios.post('/login', {
            username: this.state.brukernavn, 
            password: this.state.passord
        })    
        .then((res)=> window.location = '/')
        .catch((error) => {
             
            this.setState({error: error.response.data.error})})*/
    }
    goToPage(val, event) {
        if (val != this.state.currentPage) {
            if (val > this.state.totalPages) val = this.state.currentPage;
            if (val <= 0) val = 1;
        }
        this.setState({currentPage: val})
    }
    render(){
        return (
            <div className='registrer-parent'>
                <span id='lukk-registrering'>Lukk</span>
                <h5>RegistreringsSkjema</h5>
                <form onSubmit={this.handleSubmit}>
                   <CarouselParent currentPage={this.state.currentPage} totalPages={this.state.totalPages} goToPage={this.goToPage}>
                        <CarouselPage>
                            <p>Kontaktinformasjon</p>
                            <TextFieldGroup value={this.state.brukernavn} name='brukernavn' onChange={this.handleChange} labelName='brukernavn'/>
                            <TextFieldGroup value={this.state.passord} name='passord' onChange={this.handleChange} labelName='passord'/>
                            <button onClick={()=> this.goToPage(2)}>Neste</button>
                        </CarouselPage>
                        <CarouselPage>
                           <p>Betalingsinformasjon</p>
                            <TextFieldGroup value='Mitt kort' name='brukernavn' onChange={() => {}} labelName='brukernavn' disabled={true}/>
                            <TextFieldGroup value={this.state.passord} name='passord' onChange={this.handleChange} labelName='passord'/>
                            <button onClick={()=> this.goToPage(1)}>Forrige</button>
                            <button onClick={()=> this.goToPage(3)}>Neste</button>
                        </CarouselPage>
                        <CarouselPage>
                           <p>Velg abonnement</p>
                            <TextFieldGroup value='Mitt kort' name='brukernavn' onChange={() => {}} labelName='brukernavn' disabled={true}/>
                            <TextFieldGroup value={this.state.passord} name='passord' onChange={this.handleChange} labelName='passord'/>
                            <button onClick={()=> this.goToPage(2)}>Forrige</button>
                        </CarouselPage>
                    </CarouselParent>
                    <input type='submit' value='asd'/>
                </form>
                {this.state.error ? <span>{this.state.error}</span> : ''}
            </div>
        )
    }
}

