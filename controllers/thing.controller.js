const { Thing } = require("../models");

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [newThing] = await Thing.create(body);
    if (newThing) {
      return res.status(201).send({ data: newThing });
    }
    return res.status(400).send("");
  } catch (error) {
    next(error);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    if (things) {
      return res.status(200).send({ data: things });
    }
    return res.status(404).send("");
  } catch (error) {
    next(error);
  }
};

module.exports.getThingById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const thing = await Thing.findByPk(id);
    if (thing) {
      return res.status(200).send({ data: thing });
    }
    return res.status(404).send("");
  } catch (error) {
    next(error);
  }
};

module.exports.updateThingById = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const thing = await Thing.updateByPk(id, body);
    if (thing) {
      return res.status(202).send({ data: thing });
    }
    return res.status(404).send("");
  } catch (error) {
    next(error);
  }
};

module.exports.deleteThingById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const [thing] = await Thing.deleteByPk(id);
    if (thing) {
      return res.status(200).send({ data: thing });
    }
    return res.status(404).send("");
  } catch (error) {
    next(error);
  }
};
