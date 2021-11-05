import DailyMenuInfo from '../../models/dailymenuinfo';

export const SHOW_DAILY_MENU_INFO = 'SHOW_DAILY_MENU_INFO';

export const fetchDailyMenuInfo = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://www.alibabafood.ro/api/daily-menu-info.php`
            );


                if(!response.ok) {
                    throw new Error('Something went wrong');
                }

                const resData = await response.json();
                
                const loadedDailyMenuInfo = [];

                for (const key in resData) {
                    loadedDailyMenuInfo.push(
                        new DailyMenuInfo (
                            key,
                            resData[key].price,
                            resData[key].picture,
                            resData[key].order_start,
                            resData[key].order_stop,
                            resData[key].available_days
                        )
                    );
                }
               
                dispatch({
                    type: SHOW_DAILY_MENU_INFO,
                    dailyMenuInfoItems: loadedDailyMenuInfo
                });
        } catch (err) {
            throw err;
        }
    };
};