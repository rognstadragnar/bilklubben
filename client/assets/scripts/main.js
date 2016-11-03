//import style from '../styles/main.scss';
import axios from 'axios';

const lol = () => console.log('sss');
const loal = () => console.log('sss');
const laol = () => console.log('sss');


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
    console.log(window.scrollY + 'lol')
})