import { SHOW_CATEGORIES } from '../actions/categories';

const initialState = {
    availableCategories: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_CATEGORIES:
            return {
                availableCategories: action.categories
            };
    }
    return state;
}