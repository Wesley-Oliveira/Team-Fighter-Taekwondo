import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificando se esse email existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    // Verificar se a senha não bate
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const { id, name } = user;

    /* Para enviar as informações no header, investigar para adicionar mais informações no header
        const token = jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });
        res.header({
            acess_token: token,
            id,
            email: name,
        });
        return res.send(); */

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
