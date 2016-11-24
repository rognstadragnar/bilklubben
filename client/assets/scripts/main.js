import axios from 'axios';
import simpleScroll from 'simple-scroll';

import React from 'react';
import ReactDom from 'react-dom';
import LoggInnSkjema from './components/LoggInnSkjema.jsx';
import RegistreringsSkjema from './components/RegistreringsSkjema.jsx';
import Profilskjema from './components/ProfilSkjema.jsx';
import MineOrdre from './components/MineOrdre/MineOrdre.jsx';
import BestillingsShortcut from './components/Bestilling/BestillingsShortcut.jsx';


if (loggInnKryssUt) {
    loggInnKryssUt.addEventListener('click', () => {
        loggInnForm.classList.remove('showing');
    });
}

const loggUt = document.getElementById('loggUt');
if (loggUt) {
    loggUt.addEventListener('click', () => {
        axios.post('/api/logout')
        .then(() => window.location = '/')
        .catch((err) => console.log(err));
    });
}

const navigationBar = document.getElementById('navigationBar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && navigationBar) {
        navigationBar.classList.add('scrolled');
    } else {
        navigationBar.classList.remove('scrolled');
    }
})


const arrowDown = document.getElementById('arrowdown');
if (arrowDown) {
    arrowDown.addEventListener('click', () => {
        simpleScroll.element('actual-content', 70) //må endres
    });
}

const mainNavTrigger = document.getElementById('main-nav-trigger');
if (mainNavTrigger) {
    mainNavTrigger.addEventListener('click', () => {
        document.body.classList.add('nav-open');
        
    });
}


document.body.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open') && e.target === document.body){
        document.body.classList.remove('nav-open');
    }
})


if (document.getElementById('registrer-react')) ReactDom.render(<RegistreringsSkjema />, document.getElementById('registrer-react'))



const loggInnTrigger = document.getElementById('logg-inn-trigger');
const loggInnReact = document.getElementById('logg-inn-react');
const loggInnKryssUt = document.getElementById('loggInnKryssUt');
if (loggInnTrigger && loggInnReact) {
    ReactDom.render(<LoggInnSkjema />, document.getElementById('logg-inn-react'))
    loggInnTrigger.addEventListener('click', (e) => {
        if (e.target === loggInnTrigger) {
            loggInnReact.classList.toggle('showing');
        }
    });
    document.getElementById('lukk-logg-inn').addEventListener('click', (e) => {
        loggInnReact.classList.remove('showing');
    });
}


const registrerTrigger = document.getElementById('registrer-trigger');
const registrerReact = document.getElementById('registrer-react');
const lukkRegistrer = document.getElementById('lukk-registrering');
if (registrerTrigger && registrerReact) {
    ReactDom.render(<RegistreringsSkjema />, document.getElementById('registrer-react'))    
    registrerTrigger.addEventListener('click', (e) => {
        if (e.target === registrerTrigger) {
            registrerReact.classList.toggle('showing');
        }
    });
    lukkRegistrer.addEventListener('click', (e) => {
        registrerReact.classList.remove('showing');
    });
}


const profilReact = document.getElementById('profil-react');
if (profilReact) {
    ReactDom.render(<Profilskjema />, profilReact);    
}
const mineOrdrer = document.getElementById('mine-ordre-react');
if (mineOrdrer) {
    ReactDom.render(<MineOrdre />, mineOrdrer);    
}


const BestillingsShortcutReact = document.getElementById('bestillings-shortcut-react');
if (BestillingsShortcutReact) {
    ReactDom.render(<BestillingsShortcut />, BestillingsShortcutReact);    
}