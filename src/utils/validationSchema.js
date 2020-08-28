const isErrors = (schema, data) => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return false;
  } catch (e) {
    const messages = e.errors.toString();
    return messages;
  }
};
export default isErrors;
