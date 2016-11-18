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
              res.redirect('/');
            } else {
              req.session.user = null;
              req.session.auth = false;
              res.redirect('/');
            }
          } else {
            req.session.user = null;
            req.session.auth = false;
            res.redirect('/');
          }
        })
    
    } else {
      req.session.user = null;
      req.session.auth = false;
      res.sendStatus(404);  
      res.redirect('/');
    }
  }
);
router.post('/logout', (req, res) => {
  req.session.user = null;
  req.session.auth = false;
  res.redirect('/');
});

router.get('/registrer', (req, res, next) => {
  res.render('registrer', {title: 'Registrer deg | Bilklubben', auth: req.session.auth, user: req.session.user})
})

router.post('/registrer', (req, res, next) => {
  const { username, password, name } = req.body;
  //validateRegistration(username, password, name);
  //const hashedPassword = Bcrypt.hashSync(password, salt);
  let hashedPassword = Bcrypt.hashSync(password, salt)
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
  console.log(req.session)
  if (isAuthed(req)) {
    res.render('index', {auth: req.session.auth, user: req.session.user})
  } else {
    res.render('index', {auth: req.session.auth})
  }
});


export default router;