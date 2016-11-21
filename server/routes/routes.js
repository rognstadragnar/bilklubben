import express from 'express';
let router = express.Router();
import { checkLogin, isAuthed } from '../middleware/authentication';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import Bcrypt from 'bcrypt';
import { salt } from '../utils/variables';
import { User, Car, Order } from '../models';

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      User.findOne({where: {username: username}})
        .then((user)=> {
          if (user) {
            console.log(req.session, user.dataValues.id)

            if (Bcrypt.compareSync(password, user.dataValues.password)) {
              req.session.bruker = {
                fulltNavn: user.dataValues.name,
                brukernavn: user.dataValues.username,
                points: user.dataValues.points,
              }
              req.session.auth = true;
              res.sendStatus(200);
            } else {
              req.session.user = null;
              req.session.auth = false;
              res.send(401, {error: 'Feil passord.' })
            }
          } else {
            req.session.user = null;
            req.session.auth = false;
            res.send(401, {error: 'Fant ikke bruker.' })
          }
        })
    
    } else {
      req.session.user = null;
      req.session.auth = false;
      res.send(401, {error: 'Fyll ut begge felt.' })

    }
  }
);
router.post('/logout', (req, res) => {
  req.session.user = null;
  req.session.auth = false;
  res.status(200).send({error: 'myerror'});
  //res.status(500).json({error: 'myerror'});
  //res.redirect('/');
});

router.post('/api/isbruker', (req, res) => {
  console.log('got req', req.body)
  if (req.body.brukernavn) {
    User.findOne({where: {username: req.body.brukernavn}})
    .then((user)=> {
      if (user) {
        res.send(500, {error: "Brukernavnet er i bruk"})
      } else res.send(200)
    })
  }
  //res.status(500).json({error: 'myerror'});
  //res.redirect('/');
});

router.post('/api/registrer', (req, res) => {
  let points;
  const { brukernavn, passord, fulltNavn, abonnement } = req.body;
  switch (req.body.abonnement) {
    case '1': 
      points = 249;
      break;
    case '2':
      points = 490;
      break;
    case '3':
      points = 1499;
      break;
    default:
      points = 0;
      break;
  }
  console.log('got req', req.body, 'points: ' + points)

  if (brukernavn, passord, fulltNavn) {
    let hashedPassword = Bcrypt.hashSync(passord, salt)
    User.create({username: brukernavn, password: hashedPassword, name: fulltNavn, points: points})
    .then((user)=> {
        req.session.bruker = {
          fulltNavn: user.dataValues.name,
          brukernavn: user.dataValues.username,
          points: user.dataValues.points,
        }
        req.session.auth = true;
        res.send(200)
    })
    .catch((err) => res.send(500, err))
  }
  //res.status(500).json({error: 'myerror'});
  //res.redirect('/');
});

router.get('/registrer', (req, res, next) => {
  res.render('registrer', {title: 'Registrer deg | Bilklubben', auth: req.session.auth, user: req.session.user})
})

router.post('/registrer', (req, res, next) => {
  const { username, password, name } = req.body;
  //validateRegistration(username, password, name);
  //const hashedPassword = Bcrypt.hashSync(password, salt);
  let hashedPassword = Bcrypt.hashSync(password, salt)
  Car.create({make: 'Make!', model: "Model!", specs: "Bra bil", price: 100});

  User.create({username: username, password: hashedPassword, name: name})
    .then(() => {
      req.session.auth = true;
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Logg inn | BILklubben'});
});

router.get('*', (req, res) =>  {
  if (isAuthed(req)) {
    console.log(req.session)
    res.render('index', {auth: req.session.auth, user: req.session.user})
  } else {
    res.render('index', {auth: req.session.auth})
  }
});


export default router;