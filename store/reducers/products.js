import { SHOW_PRODUCTS } from '../actions/products';


const initialState = {
    availableProducts: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_PRODUCTS:
            return {
                availableProducts: action.products
            };
    }
    return state;
}