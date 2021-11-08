import DailyMenuItems from '../../models/dailymenuitems';

export const SHOW_DAILY_MENU_ITEMS = 'SHOW_DAILY_MENU_ITEMS';

export const fetchDailyMenuItems = () => {
    return  async(dispatch, getState) => {
        try {
            const response = await fetch(
                `https://www.alibabafood.ro/api/daily-menu-items.php`
            );

           if(!response.ok) {
               throw new Error('Something went wrong');
           }
           
           const resData = await response.json();

           const loadedDailyMenuItems = [];

           for (const key in resData) {
               loadedDailMenuItems.push (
                new DailyMenuItems (
                       key,
                       resData[key].id,
                       resData[key].menu_id,
                       resData[key].category_id,
                       resData[key].name,
                       resData[key].stock 
                    )
               );
           }

            dispatch({
                type: SHOW_DAILY_MENU_ITEMS,
                dailyMenuItems: loadedDailyMenuItems
            });

        } catch (err) {
            throw err;
        }
    };
};
