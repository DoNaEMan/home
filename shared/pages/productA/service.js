import axios from '../../../utils/axios';

export const loaddata = (domain = '') => {
  return {
    request: () => axios.post(`${domain}/api/test`),
    callback: (dispatch, res) => (dispatch({
      type: 'ADD_TODO',
      payload: res.data,
    })),
  };
};