export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function isAuthorizationError(error: unknown) {
  return getErrorMessage(error) === 'Authorization error';
}
