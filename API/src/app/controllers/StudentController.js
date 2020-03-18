import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const students = await Student.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(students);
  }

  async show(req, res) {
    // Para pegar o valor passado no header -- testeheader = a variavel passada no header
    // const head = req.headers.testeheader;
    // console.log(head);

    // Para pegar o valor passado por uma url query -- após a rota exemplo?teste=1
    // const que = req.query;
    // console.log(que);

    // Para pegar o valor passado na rota e pesquisar por ele -- Após a rota com /:id -- abc/teste/3
    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(200).json({ message: 'No existing users' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      observacao: Yup.string().required(),
      gub: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      observacao: Yup.string().required(),
      gub: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const newStudent = await student.update(req.body);

    return res.json(newStudent);
  }

  async delete(req, res) {
    const student_id = req.params.id;
    const student = await Student.findByPk(student_id);

    // Usuário precisa existir para ser deletado
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    await student.destroy();

    return res.send();
  }
}

export default new StudentController();
