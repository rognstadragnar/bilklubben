/*import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const checkLogin = (username, password, next) => {
    if (username && password) {
        User.findOne({where: {username: username}})
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(password, user.dataValues.password)) {
                        const { _id, username } = user.dataValues;
                        const token = jwt.sign({
                        _id,
                        email
                        }, config.jwt.secret)
                        next({ token })
                    } else {
                        res.status(401).json({errors: { form: 'Invalid Credentials' }})
                    }
                } else {
                    res.status(401).json({errors: { form: 'Invalid Credentials' }})
                }
            })
    }
};

*/

export function checkLogin(req, res, next) {
  if (!req.session.auth) {
      return res.redirect('/login');
  }
  next();
}

export function isAuthed(req) {
    return req.session.auth === true;
}