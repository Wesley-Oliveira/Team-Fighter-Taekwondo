/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import * as Yup from 'yup';
import Workout from '../models/Workout';
import Student from '../models/Student';

class StudentsWorkoutController {
  async showStudent(req, res) {
    const { student_id } = req.params;

    // Aqui tenho todas as aulas de um aluno
    const student = await Student.findByPk(student_id, {
      include: {
        model: Workout,
        attributes: ['id', 'tipo', 'avaliacao'], // Selecionando os valores que eu quero que me retorne
        association: 'workouts',
        through: { attributes: [] }, // não deve retornar nada da tabela intermediária
      },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    return res.json(student.workouts);
  }

  async showWorkout(req, res) {
    const { workout_id } = req.params;

    // Aqui tenho todos os alunos de um treino
    const workout = await Workout.findByPk(workout_id, {
      include: {
        model: Student,
        attributes: ['id', 'name', 'gub', 'observacao'], // Selecionando os valores que eu quero que me retorne
        association: 'students',
        through: { attributes: [] }, // não deve retornar nada da tabela intermediária
      },
    });

    if (!workout) {
      return res.status(400).json({ error: 'Student not found' });
    }

    return res.json(workout.students);
  }

  async store(req, res) {
    const schema = Yup.array()
      .of(
        Yup.object().shape({
          student_id: Yup.number().integer(),
          workout_id: Yup.number().integer(),
        })
      )
      .required();

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const array = req.body;

    // Validações e inserção
    for (let i = 0; i < array.length; i++) {
      const student = await Student.findByPk(array[i].student_id);
      if (!student) {
        return res.status(400).json({ message: 'No existing Student.' });
      }

      const workout = await Workout.findByPk(array[i].workout_id);
      if (!workout) {
        return res.status(400).json({ message: 'No existing Workout.' });
      }

      await student.addWorkout(workout);
    }

    return res.json('array');
  }

  async delete(req, res) {
    const { student_id, workout_id } = req.params;
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const workout = await Workout.findOne({
      where: { id: workout_id },
    });

    await student.removeWorkout(workout);

    return res.send();
  }
}

export default new StudentsWorkoutController();
