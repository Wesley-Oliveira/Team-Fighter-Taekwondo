import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    // Adicionar paginação
    // Para pegar todos que existirem
    const { page = 1 } = req.query;
    const users = await User.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(users);
  }

  async show(req, res) {
    // Para pegar o valor passado no header -- testeheader = a variavel passada no header
    // const head = req.headers.testeheader;
    // console.log(head);

    // Para pegar o valor passado por uma url query -- após a rota exemplo?teste=1
    // const que = req.query;
    // console.log(que);

    // Para pegar o valor passado na rota e pesquisar por ele -- Após a rota com /:id -- abc/teste/3
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(200).json({ message: 'No existing users' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  // Atualização de usuário só pode ser feita por ele mesmo
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { email, oldPassword } = req.body;

    // mudar aqui para req.params.id e adicionar em routes, caso queira liberar para um usuário att o outro
    // Esse req.userId possui o valor do usuário que efetivou o login, o id está dentor do payload do token
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Wrong password.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    // Usuário precisa existir para ser deletado
    if (!user) {
      return res.status(400).json({ error: 'User does not exist.' });
    }

    // Não pode se excluir
    if (user.id === req.userId) {
      return res.status(401).json({ error: 'Unauthorized request.' });
    }

    await user.destroy();

    return res.send();
  }
}

export default new UserController();
