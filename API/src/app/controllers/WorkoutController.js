import * as Yup from 'yup';
import Workout from '../models/Workout';

class WorkoutController {
  async index(req, res) {
    // Adicionar paginação
    // Para pegar todos que existirem
    const { page = 1 } = req.query;
    const workouts = await Workout.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(workouts);
  }

  async show(req, res) {
    // Para pegar o valor passado no header -- testeheader = a variavel passada no header
    // const head = req.headers.testeheader;
    // console.log(head);

    // Para pegar o valor passado por uma url query -- após a rota exemplo?teste=1
    // const que = req.query;
    // console.log(que);

    // Para pegar o valor passado na rota e pesquisar por ele -- Após a rota com /:id -- abc/teste/3
    const workout_id = req.params.id;
    const workout = await Workout.findByPk(workout_id);

    if (!workout) {
      return res.status(200).json({ message: 'No existing users' });
    }

    return res.json(workout);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      tipo: Yup.string().required(),
      avaliacao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const workout = await Workout.create(req.body);

    return res.json(workout);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      tipo: Yup.string().required(),
      avaliacao: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const workout_id = req.params.id;
    const workout = await Workout.findByPk(workout_id);

    if (!workout) {
      return res.status(400).json({ error: 'Workout does not exist.' });
    }

    const newWorkout = await workout.update(req.body);

    return res.json(newWorkout);
  }

  async delete(req, res) {
    const workout_id = req.params.id;
    const workout = await Workout.findByPk(workout_id);

    // Usuário precisa existir para ser deletado
    if (!workout) {
      return res.status(400).json({ error: 'Workout does not exist.' });
    }

    await workout.destroy();

    return res.send();
  }
}

export default new WorkoutController();
