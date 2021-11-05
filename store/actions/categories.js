import Category from "../../models/category";

export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';

export const fetchCategories = () => {
    return async (dispatch, getState) => {
        try {             
            const response = await fetch(
                `https://www.alibabafood.ro/api/categories.php`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedCategories = [];

            for (const key in resData) {
                //console.log(key);
                loadedCategories.push(
                    new Category(
                        key,
                        resData[key].name,
                        resData[key].picturFullLink,
                        resData[key].deliveryTime
                    )
                );
            }

          dispatch({
            type: SHOW_CATEGORIES,
            categories: loadedCategories 
          });  
        } catch (err) {
             //optional send to analytics server
             throw err;  
        }    
    };
};