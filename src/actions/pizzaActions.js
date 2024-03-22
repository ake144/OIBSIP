import axios from 'axios';


export const getAllPizzas = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/getPizzas');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
