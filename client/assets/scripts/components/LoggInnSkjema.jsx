import React from 'react';
import TextFieldGroup from './_common/textfieldgroup.jsx';
import Axios from 'axios';

export default class LoggInnSkjema extends React.Component {
    constructor(){
        super();
        this.state = {brukernavn: '', passord: '', error: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e){
        const dirty = [e.target.name] + 'Dirty';
        let isDirty = '';
        e.target.value !== '' ? isDirty = 'dirty' : isDirty = '';
        this.setState({ [e.target.name]: e.target.value, [dirty]: isDirty})
    }
    handleSubmit(e){
        e.preventDefault();
        Axios.post('/api/login', {
            username: this.state.brukernavn, 
            password: this.state.passord
        })    
        .then((res)=> window.location = '/?status=loggetinn')
        .catch((error) => {
             
            this.setState({error: error.response.data.error})})
    }
    render(){
        return (
            <div className='logg-inn-parent'>
                <span id='lukk-logg-inn' className='lukk'></span>
                <h5>Logg inn</h5>
                <form onSubmit={this.handleSubmit}> 
                    <TextFieldGroup icon='../assets/img/icons/person.svg' value={this.state.brukernavn} name='brukernavn' onChange={this.handleChange} placeholder='brukernavn'/>
                    <TextFieldGroup icon='../assets/img/icons/lock.svg' value={this.state.passord} name='passord' field='password' onChange={this.handleChange} placeholder='passord'/>
                    <input type='submit' value='Logg inn'/>
                </form>
                {this.state.error ? <span className='error'>{this.state.error}</span> : ''}
            </div>
        )
    }
}

