export const INTIAL_STATE = {
  authenticated: localStorage.getItem("accesstoken") ? true : false,
};
console.log(INTIAL_STATE.authenticated);

export const userExistReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_STATUS":
      return (state.authenticated = true);
    case "LOGOUT_USER": {
      localStorage.clear();
      return (state.authenticated = false);
    }
  }
};
