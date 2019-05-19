const axios = function () {};

const badEmail = 'usedemail@airwallex.com';

const dataFormatError = 'dataFormatError';

axios.post = (url, data) => new Promise((resolve, reject) => {
  process.nextTick(() => {
    if (data.email !== badEmail) {
      if (data.name !== dataFormatError) {
        resolve({
          data: {
            success: true,
            value: 'Register'
          }
        });
      } else {
        resolve('');
      }
    } else if (data.name !== dataFormatError) {
      reject({
        response: {
          data: {
            success: false,
            errorMsg: { errorMessage: 'Bad Request: Email is already in use' }
          }
        }
      });
    } else {
      reject('');
    }
  });
});

export default axios;