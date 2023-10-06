import axios from "axios"
export const DOGBYNAME = 'DOGBYNAME'
export const DOGBYID = "DOGBYID"
export const DOG_ERROR = "DOG_ERROR" 
export const ALLDOGS= 'ALLDOGS'
export const ORDER = 'ORDER'
export const FILTER_TEMP = "FILTER_TEMP"
export const ALLTEMP = 'ALLTEMP'
export const EDIT_DOG = "EDIT_DOG"
export const ADD_FAV = "ADD_FAV"
export const DELETE_FAV = "DELETE_FAV"
export const CLEAR_DOGS = 'CLEAR_DOGS'
export const FILTER_ORIGIN = "FILTER_ORIGIN"


const endpoint = "http://localhost:3001";

 export const dogByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endpoint}/dogs/s/name?name=${name}`);
      console.log(data)
      return dispatch({
        type: DOGBYNAME,
        payload: data,
      });
    } catch (error) {
        return dispatch({
         type: DOG_ERROR,
      })
    }
  };
};

export const dogById = (id) => {
  return async (dispatch) => {
    try{
      const { data } = await axios(`${endpoint}/dogs/${id}`)
      const dataArray = [data];
      console.log(dataArray)
      return dispatch({
        type: DOGBYID,
        payload: dataArray
      })
    } catch(error){
      console.error('Error al traer el perro por id')
    }
  }
}
 export const allDogs = () => {
   return async (dispatch) => {
    try{     
      const { data } = await axios.get(`${endpoint}/dogs/`);
      dispatch({
      type: ALLDOGS,
      payload: data,
    })
  } catch(error){
    console.error('Error al traer todos los perros', error);
  }
 }}
 
export function orderDogs(order) {
  return (dispatch) =>{
    return dispatch({
        type: ORDER,
        payload: order
    })
}
};

export function filterTemperaments(temp) {
  return (dispatch) =>{

    return dispatch({
        type: FILTER_TEMP,
        payload: temp
    })
}
  }

export function allTemperaments() {
  return async(dispatch) =>{
    const {data} = await axios(`${URL}/temperament/`)
    return dispatch({
        type: ALLTEMP,
        payload: data
    })
}
}

export const editDog = (dogToEdit) => {
  return(dispatch) => {
      return dispatch({
          type: EDIT_DOG,
          payload: dogToEdit
      })
  }
}

export const addFav = (dogToFav) => {
  return (dispatch) => {
      return dispatch({
          type: ADD_FAV,
          payload: dogToFav
      })
  }
}
export const deleteFav = (id) => {
  return (dispatch) => {
      return dispatch({
          type: DELETE_FAV,
          payload: id
      })
  }
}

export const clearDogs = () => {
    return (dispatch) => {
      return dispatch({
        type: CLEAR_DOGS,
        payload: []
      })
    };
  };

  export const filterOrigin = (created) =>{
    return (dispatch) =>{
        return dispatch({
            type: FILTER_ORIGIN,
            payload: created
        })
    }
};