import express from 'express';
let router = express.Router();
import { checkLogin, isAuthed } from '../middleware/authentication';
import { isAvailable } from '../middleware/availability';
import flashMsg from '../middleware/flashMsg';

import Moment from 'moment';
require('moment-range');
import Bcrypt from 'bcrypt';
import { salt } from '../utils/variables';
import { User, Car, Order } from '../models';

import Nyheter from '../data/nyheter';

router.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      User.findOne({where: {username: username}})
        .then((user)=> {
          if (user) {
            console.log(req.session, user.dataValues.id)

            if (Bcrypt.compareSync(password, user.dataValues.password)) {
              req.session.bruker = {
                id: user.dataValues.id,
                fulltNavn: user.dataValues.name,
                brukernavn: user.dataValues.username,
                points: user.dataValues.points,
                abonnement: user.dataValues.plan,
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
    User.create({username: brukernavn, password: hashedPassword, name: fulltNavn, plan: abonnement, points: points})
    .then((user)=> {
        req.session.bruker = {
          id: user.dataValues.id,
          fulltNavn: user.dataValues.name,
          brukernavn: user.dataValues.username,
          points: user.dataValues.points,
          abonnement: req.body.abonnement
        }
        req.session.auth = true;
        res.send(200)
    })
    .catch((err) => res.send(500, err))
  } else {
    res.status(500).json({error: 'myerror'});
  }
});

router.post('/api/fyll', (req, res) => {
  try {
    const { amount } = req.body
    if (isAuthed(req) === true && amount > 0) {
      console.log('yeas')
      User.findOne({where: {id: req.session.bruker.id}, attributes: ['id', 'points']})
        .then((user) => {
          if (user) {
            const newPoints = Number(user.dataValues.points) + Number(amount);
            User.update({points: newPoints}, {where: {id: user.dataValues.id}})
            .then(()=> {
              req.session.bruker.points = newPoints;
              return res.status(200).json({newPoints: newPoints})
            })
            .catch((err) => {return res.sendStatus(500)})
          }
        })
    } else {
      return res.sendStatus(403)
    }
  }
  catch(err) {
    console.log(err);
    return res.sendStatus(403)
  }
})

router.post('/api/endre', (req, res) => {
  try {
    if (req.body.passord, req.body.nyttPassord && isAuthed(req)) {
      const { epost, fulltNavn, passord, nyttPassord, abonnement } = req.body
      User.findOne({where: {id: req.session.bruker.id}})
        .then((user)=> {
          if (user && user.dataValues.password && passord) {
            if (Bcrypt.compareSync(passord, user.dataValues.password)) {

              const hashedPassord = Bcrypt.hashSync(nyttPassord, salt)
              User.update(
                {password: hashedPassord, name: fulltNavn, email: epost, plan: abonnement}, 
                {where: {id: req.session.bruker.id}})
                .then(() => res.sendStatus(200))
                .catch((err) => res.status(403).json({error: 'Det skjedde en feil.'}))
            } else {
              return res.status(403).json({error: 'Feil passord'})
            }
          } else {
              return res.status(404).json({error: 'Feil passord'})

          }
        })
    } else if (isAuthed(req)) {
      const { epost, fulltNavn, abonnement } = req.body
        console.log(req.session)
        User.findOne({where: {id: req.session.bruker.id}})
        .then((user) => {
          if (user) {
            let newPoints, planPoints
            switch (abonnement) {
              case '1': 
                planPoints = 249;
                break;
              case '2': 
                planPoints = 490;
                break;
              case '3':
                planPoints = 1499
                break;
              default:
                planPoints = 0;
                break;
            }
            if (user.dataValues.plan !== abonnement) {
              newPoints = Number(user.dataValues.points) + planPoints
            } else {
              newPoints = user.dataValues.points
            }
              
            console.log(abonnement, req.session.bruker.abonnement, planPoints, newPoints)
            User.update({name: fulltNavn, email: epost, plan: abonnement, points: newPoints}, {where: {id: req.session.bruker.id}})
              .then(() => {
                req.session.bruker.points = newPoints;
                req.session.bruker.email = epost;
                req.session.bruker.fulltNavn = fulltNavn;
                req.session.bruker.abonnement = abonnement;
                res.status(200).json({
                  brukerInfo: {
                    points: newPoints,
                    email: epost,
                    fulltNavn: fulltNavn,
                    abonnement: abonnement
                  }
                })
              })
              .catch((err)=> {console.log(err); res.sendStatus(500)})
          }
          
        })
        
    }
  } catch(err) {
    return res.status(404).json({error: 'Det skjedde en feil'})
  }
})


router.post('/api/bestill', (req, res, next) => {
  try {
    const userId = req.session.bruker.id;
    const { bil, startDato, sluttDato } = req.body;
    const duration = Moment.range(startDato, sluttDato).diff('days');
    console.log(bil,startDato, sluttDato, userId)

    User.findOne({where: {id: userId}})
    .then(user => {
      if(user.dataValues.points > 0) {
        Car.findOne({whre: {id: bil}})
        .then(car => {
          if (car.dataValues.price * duration <= user.dataValues.points) {
            Order.create({startdate: startDato, enddate: sluttDato, cost: car.dataValues.price * duration, user_id: userId, bkUserId: userId, car_id: bil, bkCarId: bil})
            .then(() => 
              User.update({points: Number(user.dataValues.points - (car.dataValues.price * duration))}, {where: {id: userId}})
             
              .then(()=> {req.session.bruker.points = user.dataValues.points - (car.dataValues.price * duration);res.sendStatus(200)})
            )
            
          } else {
            return res.status(403).json({error: 'Du har ikke nok poeng.'})
          }
        })
        .catch(err => res.status(403).json({error: 'Fant ikke bil.'}))
      } else {
        return res.status(403).json({error: 'Du har ikke nok poeng.'})
      }
    })
    .catch(err => res.status(403).json({error: 'Ikke gyldig bruker.'}))
  } catch(err) {
    return res.status(500).json({error: 'err'});
  }
})

router.get('/api/getbiler', (req, res) => {
  let cars = [];
  Car.findAll()
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then(() => res.status(200).json({biler: cars}))
  .catch(err => res.statis(404).json({error: 'fant ikke biler'}))
})

router.post('/api/finnOpptatteBiler', (req, res) => {
  
  try {
      const stD = Moment(req.body.startDato).isValid() ? Moment(req.body.startDato) : Moment(),
        slD = Moment(req.body.sluttDato).isValid() ? Moment(req.body.sluttDato) : Moment(stD) ? 
        Moment(req.body.startDato).add(1, 'days') : Moment().add(1, 'days')
      let opptatteBiler = []
      Order.findAll({
        where: {
          $or: [
            {$and: [
              {startdate: {$lte: stD.toDate()}}, 
              {enddate: {$gte: slD.toDate()}}
            ]},
            {$and: [
              {startdate: {$gte: stD.toDate()}},
              {startdate: {$lte: slD.toDate()}}
            ]},
            {$and: [
              {enddate: {$gte: stD.toDate()}},
              {enddate: {$lte: slD.toDate()}}
            ]}
          ]
        }
      })
      .then(orders => orders.map(o => {console.log(o.dataValues);opptatteBiler.push(o.dataValues.bkCarId)}))
      .then(() => res.status(200).json({opptatteBiler: opptatteBiler.filter(
        (elem, index, self) => index == self.indexOf(elem)
      )})
)


  } 
  catch(err) {
    console.log(err)
  }
})


router.post('/api/finnOpptatteDatoer', (req, res) => {
  try {
    const bilId = req.body.bilId
    let datoer = [];
    Order.findAll({where: {bkCarId: bilId}})
    .then(orders => orders.map(o => datoer.push({start: Moment(o.dataValues.startdate).subtract(1, 'days'), slutt: Moment(o.dataValues.enddate).add(1, 'days')})))
    .then(() => res.status(200).json({opptatteDatoer: datoer}))
  } 
  catch(err) {
    console.log(err)
  }
})

router.get('/biler', (req, res) => {
  let cars = [];
  Car.findAll()
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then( () => {
    if (isAuthed(req)) {
      res.render('biler', {auth: req.session.auth, bruker: req.session.bruker, biler: cars,flashMsg: flashMsg(req.query)})
    } else {
      res.render('biler', {auth: req.session.auth, biler: cars, flashMsg: flashMsg(req.query)})
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
    if (isAuthed(req)) {
      res.render('bilerSingle', {auth: req.session.auth, bruker: req.session.bruker, bil: theCar, flashMsg: flashMsg(req.query)})
    } else {
      res.render('bilerSingle', {auth: req.session.auth, bil: theCar, flashMsg: flashMsg(req.query)})
    }
  })
  .catch(err => res.redirect('/biler'))
})

router.get('/api/getBruker', (req, res) => {
  if (isAuthed(req)) {
    res.status(200).json({bruker: req.session.bruker})
  } else {
    res.sendStatus(403)
  }
})

router.get('/api/getOrdre', (req, res) => {
  let ordre = [];
  let biler = []
  Order.findAll({
    where: {user_id: req.session.bruker.id},
    include: [{
        model: Car, attributes: ['make', 'model']
    }]
  })
  .then(res => res.map(o => {
    ordre.push({
      id: o.dataValues.id,
      bilMerke: o.dataValues.bk_car.make,
      bilModell: o.dataValues.bk_car.model,
      startDato: o.dataValues.startdate,
      sluttDato: o.dataValues.enddate,
      ordreDato: o.dataValues.createdAt,
      kostnad: o.dataValues.cost
    });
  }))
  .then(() => {res.status(200).json({ordre: ordre});console.log(ordre)})
  .catch(err => console.log('err', err))
})

router.get('/bestilling', (req, res) => {
  if (isAuthed(req)) {
    res.render('bestilling', {auth: req.session.auth, bruker: req.session.bruker, flashMsg: flashMsg(req.query)})
  } else {
    res.redirect('/?status=ikkelov')
  }
})


router.get('/aktuelt', (req, res) => {
  res.render('aktuelt', {auth: req.session.auth, bruker: req.session.bruker, nyheter: Nyheter, flashMsg: flashMsg(req.query)})
})

router.get('/aktuelt/:id', (req, res) => {
  if (req.params.id <= Nyheter.length && req.params.id > 0) res.render('aktueltSingle', {auth: req.session.auth, bruker: req.session.bruker, nyheter: Nyheter, nyheten: req.params.id - 1, flashMsg: flashMsg(req.query)})
  else res.redirect('/aktuelt')
})



router.get('/profil', (req, res) => {
  if (isAuthed(req)) {
    res.render('profil', {auth: req.session.auth, bruker: req.session.bruker, flashMsg: flashMsg(req.query)})
  } else {
    res.redirect('/?status=ikkelov')
  }
})

router.get('/', (req, res) =>  {
    let cars = [];
  Car.findAll()
  .then(car => {
    car.map((v) => {cars.push(v.dataValues)})
  })
  .then(() => {
    if (isAuthed(req)) {
      res.render('index', {auth: req.session.auth, bruker: req.session.bruker, biler: cars, nyheter: Nyheter, flashMsg: flashMsg(req.query)})
    } else {
      res.render('index', {auth: req.session.auth, biler: cars, nyheter: Nyheter, flashMsg: flashMsg(req.query)})
    }
  })
});


router.get('*', (req, res) =>  {
  res.redirect('/')
});




export default router;