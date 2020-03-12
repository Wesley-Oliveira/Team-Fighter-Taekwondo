import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // Para transformar a callback em uma async await
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token does not exist.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Com isso não preciso enviar o id do usuário na rota para atualizar, pois no payload já tenho o id dele
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
