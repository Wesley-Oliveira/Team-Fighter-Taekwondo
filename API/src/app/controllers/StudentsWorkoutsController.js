/* eslint-disable no-plusplus */
import * as Yup from 'yup';
import Workout from '../models/Workout';
import Student from '../models/Student';
import StudentWorkout from '../models/StudentsWorkouts';

class WorkoutController {
  async show(req, res) {
    // Para pegar o valor passado no header -- testeheader = a variavel passada no header
    // const head = req.headers.testeheader;
    // console.log(head);

    // Para pegar o valor passado por uma url query -- após a rota exemplo?teste=1
    // const que = req.query;
    // console.log(que);

    // Para pegar o valor passado na rota e pesquisar por ele -- Após a rota com /:id -- abc/teste/3
    const { workout_id } = req.params;
    const workout = await Workout.findByPk(workout_id);

    if (!workout) {
      return res.status(200).json({ message: 'No existing Workout.' });
    }

    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(200).json({ message: 'No existing Student.' });
    }

    const studentworkoutExist = await StudentWorkout.findOne({
      where: { workout_id, student_id },
    });

    if (!studentworkoutExist) {
      return res.status(400).json({
        message: 'Bad Request: workout_id or student_id invalid',
      });
    }

    return res.json({ workout, student });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .required()
        .integer(),
      workout_id: Yup.number()
        .required()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { student_id } = req.body;
    const student = await Student.findByPk(student_id);

    const { workout_id } = req.body;
    const workout = await Workout.findByPk(workout_id);

    if (!workout) {
      return res.status(400).json({ message: 'No existing Workout.' });
    }

    if (!student) {
      return res.status(400).json({ message: 'No existing Student.' });
    }

    const studentworkoutExist = await StudentWorkout.findOne({
      where: { workout_id, student_id },
    });

    if (studentworkoutExist) {
      return res.status(400).json({
        message: 'The student is already registered in the workout',
      });
    }

    const studentworkout = await StudentWorkout.create(req.body);

    return res.json(studentworkout);
  }

  async delete(req, res) {
    const { workout_id } = req.params;
    const { student_id } = req.params;

    const studentworkoutExist = await StudentWorkout.findOne({
      where: { workout_id, student_id },
    });

    if (!studentworkoutExist) {
      return res.status(400).json({
        message: 'Bad Request: workout_id or student_id invalid',
      });
    }

    await studentworkoutExist.destroy();

    return res.send();
  }
}

export default new WorkoutController();
