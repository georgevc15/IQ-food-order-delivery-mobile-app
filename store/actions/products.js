import Product  from "../../models/product";

export const SHOW_PRODUCTS = 'SHOW_PRODUCTS';

export const fetchProducts = categoryId => {

    return async (dispatch, getState) => {
        try {          
            const response = await fetch(
                `https://www.alibabafood.ro/api/products.php?id=${categoryId}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            //console.log(resData);
            const loadedProducts = [];

            for (const key in resData) {
                //console.log(key);
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].categoryId,
                        resData[key].name,
                        resData[key].ingredients,
                        resData[key].price,
                        resData[key].orderStart,
                        resData[key].orderStop,
                        resData[key].picturFullLink
                    )
                );
            }
            //console.log(loadedProducts);
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