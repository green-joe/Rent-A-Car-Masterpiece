import axios from "axios"

export async function getAllCars(){
  try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/car/get/all")
      return response.data
  } catch (error) {
      return []
  }
}

