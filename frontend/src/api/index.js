import axios from 'axios';

export const getTests = async () => {
  try {
    const response = await axios.get('/tests');
    return { data: response.data, error: null };
  } catch (e) {
    if (e.response) {
      return { data: null, error: e.response.data.message };
    } else {
      return { data: null, error: e.message };
    }
  }
};

export const createTest = async (values) => {
  try {
    const response = await axios.post('/tests', values);
    return { data: response.data, error: null };
  } catch (e) {
    if (e.response) {
      return { data: null, error: e.response.data.message };
    } else {
      return { data: null, error: e.message };
    }
  }
};
