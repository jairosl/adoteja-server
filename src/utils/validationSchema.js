const isErrors = (schema, data) => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return false;
  } catch (e) {
    const messages = e.errors;
    return messages;
  }
};
export default isErrors;
