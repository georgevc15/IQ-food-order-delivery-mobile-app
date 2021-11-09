import { SHOW_DAILY_MENU_INFO } from '../actions/dailymenuinfo';

const initialState = {
    availableDailyMenuInfo: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_DAILY_MENU_INFO:
            return {
                   availableDailyMenuInfo: action.dailyMenuInfoItems
            };
    }
    return state;
}