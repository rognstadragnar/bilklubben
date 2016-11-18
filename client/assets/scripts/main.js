//import style from '../styles/main.scss';
import axios from 'axios';
//import simpleScroll from './vendor/simple-scroll';
import simpleScroll from 'simple-scroll';

const loggInnLink = document.getElementById('loggInnLink');
const loggInnForm = document.getElementById('loggInnForm');
const loggInnKryssUt = document.getElementById('loggInnKryssUt');
if (loggInnLink) {
    loggInnLink.addEventListener('click', () => {
        loggInnForm.classList.add('showing');
    });
}

if (loggInnKryssUt) {
    loggInnKryssUt.addEventListener('click', () => {
        loggInnForm.classList.remove('showing');
    });
}

const loggUt = document.getElementById('loggUt');
if (loggUt) {
    loggUt.addEventListener('click', () => {
        axios.post('/logout')
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
        //simpleScroll.setSettings({minSpeed: 0.1})
        simpleScroll.element('actual-content', 70)
    });
}

const mainNavTrigger = document.getElementById('main-nav-trigger');
if (mainNavTrigger) {
    mainNavTrigger.addEventListener('click', () => {
        //simpleScroll.setSettings({minSpeed: 0.1})
        document.body.classList.add('nav-open');
        
    });
}


document.body.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open') && e.target === document.body){
        document.body.classList.remove('nav-open');
    }
})