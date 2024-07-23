export const setToken = (token: string | null): { type: string, payload: { token: string | null } } => {
  return {
    type: 'SET_TOKEN',
    payload: { token }
  };
};
