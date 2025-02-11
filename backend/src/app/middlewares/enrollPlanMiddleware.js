import Plan from '../models/Plan';
import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    plan_id: Yup.nubmer().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { plan_id } = req.body;
  const plan = await Plan.findByPk(plan_id);

  if (!plan) {
    return res.status(400).json({ error: 'Plan does not exist' });
  }
  return next();
};