import { action } from "easy-peasy";

const initialVariant = process.env.REACT_APP_VARIANT;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  global: {
    userId: null,
    authToken: null,
    variant: initialVariant,
    setUserId: action((state, payload) => {
      state.userId = payload;
    }),
    setAuthToken: action((state, payload) => {
      state.authToken = payload;
    }),
    setVariant: action((state, payload) => {
      state.variant = payload;
    }),
  },
};
