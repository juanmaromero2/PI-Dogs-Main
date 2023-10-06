import {
  DOGBYNAME,
  DOGBYID,
  DOG_ERROR,
  ALLDOGS,
  ORDER,
  FILTER_TEMP,
  ALLTEMP,
  EDIT_DOG,
  ADD_FAV,
  DELETE_FAV,
  CLEAR_DOGS,
  FILTER_ORIGIN,
  } from "./actions";
  
  let initialState = {     
    dogs: [],
    allDogs: [],
    temperament: [],
    searchError: false,
    orderAndFilter: { order: 'A', tempFilter: 'All', originFilter: 'all' },
    dogToEdit: null,
    favorites: [],
  };

  export default function rootReducer(state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
      case DOGBYNAME:
          return {
              ...state, 
              dogs: payload,
              allDogs: payload,
              searchError:false,
              orderAndFilter:{
                    order: 'A',
                    tempFilter: 'All',
                    originFilter: 'all'
               }
          }
      case DOGBYID:
        return{
            ...state,
            dogs: payload,
            allDogs: payload,
            searchError: false
        }
      case ALLDOGS:
        let result = [];
        payload.forEach((dog) => {
            let palabras  = dog.temperament.split(", ")
            let primeraPalabra = palabras[0]
            if(!result.includes(primeraPalabra)){
                result.push(primeraPalabra);
            }
        })
          return {
              ...state,
              allDogs: payload,
              dogs: payload,
              temperament: result
          }

      case CLEAR_DOGS:
          return {
              ...state,
              allDogs: [],
              dogs: [],
          }

      case ALLTEMP:
          return {...state, temperament: payload}

      case DOG_ERROR:
          return {
              ...state, 
              searchError: true,
              dogs: [],
              allDogs:[]
          }


      case ORDER:
          let orderedDogs = [...state.dogs]
          let orderedAllDogs = [...state.allDogs]

          switch (payload) {
              case "A":
                  orderedDogs?.sort((a, b) => a.name.localeCompare(b.name))
                  orderedAllDogs?.sort((a, b) => a.name.localeCompare(b.name))
                  break;
              case "D":
                  orderedDogs?.sort((a, b) => b.name.localeCompare(a.name))
                  orderedAllDogs?.sort((a, b) => b.name.localeCompare(a.name))
                  break;
              case "minWeight":
                  orderedDogs?.sort((a, b) => {
                    let pesoA; 
                    let pesoB;

                    if(!a.weight){
                    pesoA = a.peso?.split(' - ');
                    pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                    } else{
                        pesoA = a.weight?.split(' - ');
                        pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                    }

                    if(!b.weight){
                     pesoB = b.peso?.split(' - ')      
                    pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]     
                    } else{
                     pesoB = b.weight?.split(' - ')      
                    pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]   
                    }
                    
                      return parseInt(pesoA[0]) - parseInt(pesoB[0]) 
                  })
                  orderedAllDogs?.sort(((a, b) => {
                    let pesoA; 
                    let pesoB;
                    if(!a.weight){
                        pesoA = a.peso?.split(' - ');
                         pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                        } else{
                            pesoA = a.weight?.split(' - ');
                            pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                        }
    
                        if(!b.weight){
                         pesoB = b.peso?.split(' - ')      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]     
                        } else{
                         pesoB = b.weight?.split(' - ')      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]   
                        }

                      return parseInt(pesoA[0]) - parseInt(pesoB[0]) 
                  }))
                  break;
              case "maxWeight": 
                  orderedDogs?.sort(((a, b) => {
                    let pesoA; 
                    let pesoB;

                    if(!a.weight){
                    pesoA = a.peso?.split(' - ');
                     pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                    } else{
                        pesoA = a.weight?.split(' - ');
                        pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                    }

                    if(!b.weight){
                     pesoB = b.peso?.split(' - ')      
                    pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]     
                    } else{
                     pesoB = b.weight?.split(' - ')      
                    pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]   
                    }
                    
                      return parseInt(pesoB) - parseInt(pesoA) 
         
                  }))

                  orderedAllDogs?.sort(((a, b) => {
                    let pesoA; 
                    let pesoB;
                    if(!a.weight){
                        pesoA = a.peso?.split(' - ');
                         pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                        } else{
                            pesoA = a.weight?.split(' - ');
                            pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]   
                        }
    
                        if(!b.weight){
                         pesoB = b.peso?.split(' - ')      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]     
                        } else{
                         pesoB = b.weight?.split(' - ')      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]   
                        }
                        
                          return parseInt(pesoB) - parseInt(pesoA) 
             
                  }))
                  break;
              
              default:
                  break;
          }
          return {
              ...state, 
              dogs: orderedDogs,
              allDogs: orderedAllDogs,
              orderAndFilter:{
                  ...state.orderAndFilter,
                  order: payload ? payload : 'A',
              },
          }
      
      case FILTER_TEMP:
          if(payload === 'All') {
              return{
                  ...state,
                  dogs: state.allDogs,
                  orderAndFilter: {
                      ...state.orderAndFilter,
                      tempFilter:payload,
                  },
                  searchError: state.allDogs.length > 0 ? false : true
              }
          }else{
              let filteredDogs = state.allDogs.filter((dog) => dog?.temperament?.includes(payload))
              
              return{
                  ...state,
                  dogs: filteredDogs,
                  orderAndFilter: {
                      ...state.orderAndFilter,
                      tempFilter:payload,
                      originFilter:'All',
                  },
                  searchError: filteredDogs.length ? false : true
              }
          }

      case FILTER_ORIGIN:
          if(payload === 'all') {
              return{
                  ...state,
                  dogs: state.allDogs,
                  orderAndFilter: {
                      ...state.orderAndFilter,
                      originFilter: payload,
                  },
                  searchError: state.allDogs.length > 0 ? false : true
              }
          }else{
              let filteredDogs = []
              if(payload === 'real') filteredDogs = state.allDogs.filter((dog) => typeof(dog?.id) === 'number')
              else if(payload === 'created') filteredDogs = state.allDogs.filter((dog) => typeof(dog?.id) === 'string')

              return{
                  ...state,
                  dogs: filteredDogs,
                  orderAndFilter: {
                      ...state.orderAndFilter,
                      originFilter:payload,
                      tempFilter: 'All',
                  },
                  searchError: filteredDogs.length ? false : true
              }
          }
          
    //   case EDIT_DOG:
    //       return{
    //           ...state,
    //           dogToEdit: payload
    //       }

    //   case ADD_FAV:
    //       return{
    //           ...state,
    //           favorites: [...state.favorites, payload]
    //       }

    //   case DELETE_FAV:
    //       let filteredFavs = state.favorites.filter(dog => dog.id !== payload)
    //       return{
    //           ...state,
    //           favorites: filteredFavs
    //       }

      default:
          return {...state}
  }
}