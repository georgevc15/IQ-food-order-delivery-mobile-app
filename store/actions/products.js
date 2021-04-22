import Product  from "../../models/product";

export const SHOW_PRODUCTS = 'SHOW_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {          
            const response = await fetch(
                `https://www.alibabafood.ro/api/products.php`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                //console.log(key);
                loadedProducts.push(
                    new Category(
                        key,
                        resData[key].categoryId,
                        resData[key].name,
                        resData[key].ingredients,
                        resData[key].price,
                        resData[key].orderStart,
                        resData[key].orderStop
                    )
                );
            }

          dispatch({
            type: SHOW_PRODUCTS,
            products: loadedProducts 
          });  
        } catch (err) {
             //optional send to custom analytics server
             throw err;  
        }    
    };
};