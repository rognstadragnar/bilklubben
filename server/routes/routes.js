import express from 'express';
let router = express.Router();
import { checkLogin, isAuthed } from '../middleware/authentication';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import Bcrypt from 'bcrypt';
import { salt } from '../utils/variables';
import User from '../models/User';

passport.use(new LocalStrategy(
  function(username, password, done) {
  /*  User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });*/
      return done(null, {})

  }
));

router.post('/login', 
  /*passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })*/(req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      req.session.auth = true;
      req.session.asd = username;
      res.redirect('/');
    } else {
      req.session.auth = false;
      res.redirect('/login');
    }
  }
);
router.post('/logout', (req, res) => {
      req.session.auth = false;
      req.session.asd = null;
      res.redirect('/');
  }
);

router.get('/registrer', (req, res, next) => {
  res.render('registrer', {title: 'Registrer deg | Bilklubben'})
})

router.post('/registrer', (req, res, next) => {
  const { username, password, name } = req.body;
  //validateRegistration(username, password, name);
  const hashedPassword = Bcrypt.hashSync(password, salt);
  console.log(username, password + '===' + hashedPassword, name)
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

router.get('/innloggin', checkLogin, (req, res) =>  {
  res.render('index', {name: req.session.asd})
});

router.get('*', (req, res) =>  {
  if (isAuthed(req)) {
    res.render('index', {auth: req.session.auth})
  } else {
    res.render('index', {auth: req.session.auth})
  }
});


export default router;