import { SHOW_DAILY_MENU_ITEMS } from '../actions/dailymenuitems';


const initialState = {
    availableDailyMenuItems: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_DAILY_MENU_ITEMS:
          return  { ...state, availableDailyMenuItems: action.dailyMenuItems };
        }
    return state;    
}