import apiClient from '../services/apiclient';

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const registerUser = async (fullName,email, password) => {
    try {
      const response = await apiClient.post('/api/auth/register', {fullName, email, password });
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };

  export const verifyOtp = async (email, otp) => {
    try {
      const response = await apiClient.post('/api/auth/verify-otp', { email, otp });
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
