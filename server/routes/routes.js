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
              const {id, username } = user.dataValues;
              req.session.user = {id: id, username: username};
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
    res.render('index', {auth: req.session.auth, user: req.session.user})
  } else {
    res.render('index', {auth: req.session.auth})
  }
});


export default router;