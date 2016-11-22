import express from 'express';
let router = express.Router();
import { checkLogin, isAuthed } from '../middleware/authentication';
import { isAvailable } from '../middleware/availability';

import Moment from 'moment';
require('moment-range');
import Bcrypt from 'bcrypt';
import { salt } from '../utils/variables';
import { User, Car, Order } from '../models';

router.post('/api/login', (req, res) => {
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
router.post('/api/logout', (req, res) => {
  req.session.user = null;
  req.session.auth = false;
  res.status(200).send({error: 'myerror'});
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
  } else {
    res.status(500).json({error: 'myerror'});
  }
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
  } else {
    res.status(500).json({error: 'myerror'});
  }
});

router.post('/api/bestill', (req, res, next) => {
  try {
    const { c_id, u_id, startDato, sluttDato } = req.body  
    let userInfo = {}, carInfo = {}, orderInfo = {}, kostnad;
    const duration = Moment.range(
      new Moment(startDato).format('YYYY-MM-DD'), 
      new Moment(sluttDato).format('YYYY-MM-DD')
    ).diff('days');
    orderInfo.opptatt = [];
  if (c_id && u_id && startDato && sluttDato && isAuthed(req) === false) {
    User.findOne({where: {id: u_id}, attributes: ['id','points']})
        .then((user)=> { 
          if (!user) {
            res.status(404).json({error: 'Fant ikke bruker.'})
            next();
          } else {
            userInfo.id = user.dataValues.id, userInfo.points = user.dataValues.points;

            Car.findOne({where: {id: c_id}, attributes: ['price']})
            .then(car => {
              kostnad = car.dataValues.price * duration;
              console.log('kostnad!!:',kostnad, user.dataValues.points)
              if (kostnad > user.dataValues.points) {
                res.status(500).json({error: 'Ikke nok poeng.'})
                return;
              } else  {
                Order.findAll({where: {car_id: c_id}})
                .then((orders) => {
                
                  orders.map(o => {
                    orderInfo.opptatt.push(
                      {startDato: o.dataValues.startdate, 
                      sluttDato: o.dataValues.enddate})
                 })
                })
                .then(()=> {
                  if (isAvailable(startDato, sluttDato, orderInfo.opptatt) === true) {
                    Order.create({car_id: c_id, user_id: u_id, startdate: startDato, enddate: sluttDato, cost: kostnad})
                    .then(() => {
                      User.update({points: user.dataValues.points - kostnad}, {where: {id: u_id}})
                    })
                    .catch((err) => console.log(err))
                  } else {
                    res.send(404).json({error: 'E ittj leedig nei shø'})
                    next();
                  }
                })
                .catch((err) => console.log(err))
 
              
              }
          
        })
    .then(()=> res.status(200).json({error: 'Funke fjell'}))
    .catch((err) => {console.log(err)})

          }
  }) }else {res.sendStatus(403)}
  } catch(err) {
    res.sendStatus(200);
  }
})

router.get('/biler', (req, res) => {
  let cars = [];
  Car.findAll({attributes: ['id', 'make', 'model', 'specs', 'price']})
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then( () => {
    if (isAuthed(req)) {
      res.render('biler', {auth: req.session.auth, bruker: req.session.bruker, biler: cars})
    } else {
      res.render('biler', {auth: req.session.auth, biler: cars})
    }
  })
})

router.get('/biler/:id', (req, res) => {
  let theCar;
  Car.findOne({
    where: {
      id: req.params.id}
    })
  .then(car => {
    theCar = car.dataValues
  })
  .then(() => {
    res.render('bilerSingle', {auth: req.session.auth, bil: theCar})
  })
  .catch(err => res.redirect('/'))
})

router.get('/profil', (req, res) => {
  if (isAuthed(req)) {
    res.render('profil', {auth: req.session.auth, bruker: req.session.bruker})
  } else {
    res.redirect('/')
  }
})

router.get('/', (req, res) =>  {
  let cars = [];
  Car.findAll({attributes: ['id', 'make', 'model', 'specs', 'price']})
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then( () => {
    if (isAuthed(req)) {
      res.render('index', {auth: req.session.auth, bruker: req.session.bruker, biler: cars})
    } else {
      res.render('index', {auth: req.session.auth, biler: cars})
    }
  })
});


router.get('*', (req, res) =>  {
  res.redirect('/')
});


export default router;