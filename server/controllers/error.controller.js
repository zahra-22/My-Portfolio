// Convert raw errors into readable messages
export const getErrorMessage = (err) => {
  if (err?.message) return err.message;
  return "Something went wrong";
};

// Send error response safely to frontend
export const handleError = (res, err, status = 500) => {
  console.error(err);
  return res.status(status).json({ message: getErrorMessage(err) });
};
