import Bcrypt from 'bcrypt';


export const salt = Bcrypt.genSaltSync(10);