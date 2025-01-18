export const idParamCheck = async (req, res, next) => {
  const id = req?.params?.id ? parseInt(req.params.id, 10) : undefined;
  if (id === undefined || !isNaN(id)) {
    res.status(400).send({ message: 'Id is not a number' });
    return;
  }
  next();
};