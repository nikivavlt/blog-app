const initialState: string = null;

function tokenReducer (token = initialState, action: { type: string, payload: { token: string } }): string {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TOKEN':
      return payload.token;

    default:
      return token;
  };
}

export default tokenReducer;
