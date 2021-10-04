import { ADD_TO_CART, ADD_QUANTITY }  from '../actions/cart';

const initialState = {
    cars: [], //products
    quantities: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:

        /*
              const newCar = {
                id: action.cars.id,
                type: action.cars.type,
                model: action.cars.model,
                color: action.cars.color,
              };
            


              return {
                ...state,
                cars: state.cars.concat(newCar)
              }*/

        case ADD_QUANTITY:
            
           const index = state.quantities.findIndex(quant => quant.id === action.quantities.id); 
           const newArray = [...state.quantities]; //making a new array
           
           if(index !== -1) {
            newArray[index].quantity = action.quantities.quantity;


            return {
              ...state,
              quantities: newArray 
            }


           } else {
              const newQuantities = {
                id: action.quantities.id,
                quantity: action.quantities.quantity
            }
          
            return {
              ...state,
              quantities: state.quantities.concat(newQuantities) 
            }
          
          }

     };
      
    return state;
};

