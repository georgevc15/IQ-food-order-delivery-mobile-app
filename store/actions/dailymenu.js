import AsyncStorage from '@react-native-async-storage/async-storage';
import DailyMenu from "../../models/dailymenu";

export const SHOW_DAILY_MENU = 'SHOW_DAILY_MENU';

export const fetchDailyMenu = () => {

    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://www.alibabafood.ro/api/dailymenu.php?`
            );
        
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        const loadedDailyMenu = [];

    }

}