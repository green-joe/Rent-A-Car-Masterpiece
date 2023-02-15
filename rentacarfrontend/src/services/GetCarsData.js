import axios from "axios"

export async function getAllData(){
  try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/car/get/all")
      return response.data
  } catch (error) {
      return []
  }
}

export const getAllCars=()=> getAllData().then(data=>{
  let carsItems=[]
  for (let i = 0; i < data.length; i++) {          
    var base64Flag = "data:image/png;base64,"
    let automatic,gps;            
    if (data[i].automatic === true || data[i].gps===true) {
      automatic = 'Automatic',
      gps='GPS Navigation'
    } else {
      automatic = 'Non Automatic',
      gps='Non GPS Navigation'
    }
    const car =
    {
      imageData: base64Flag + data[i].carImages[0].imageData,
      name: data[i].name,
      price: data[i].pricePerDay,
      model: data[i].model,
      automatic: automatic,
      gps:gps,
      description:data[i].description
    }
    carsItems.push(car) 
                
  }      

  return carsItems
  
 })

 

