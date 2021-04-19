const getMessage = (message: string, scope?: string) => {
  if (typeof console === 'undefined') return;

  const prefix = scope ? `[${scope}]: ` : '';
  const log = `${prefix}${message}`;

  return log;
};

export const warning = (valid: boolean, message: string, scope?: string) => {
  if (typeof console === 'undefined') return;
  if (valid) return;

  const log = getMessage(message, scope);

  if (process.env.NODE_ENV !== 'production') {
    return console.error(log);
  }

  console.warn(log);
};

export const info = (message: string, scope?: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(getMessage(message, scope));
  }
};

export const throwError = (valid: boolean, message: string, scope?: string) => {
  if (valid) return;

  const log = getMessage(message, scope);

  throw Error(log);
};
