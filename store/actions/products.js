import AsyncStorage from '@react-native-async-storage/async-storage';
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

            const loadedProducts = [];

            for (const key in resData) {
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


function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

const saveSessionIdToStorage = (sessionId) => {
    AsyncStorage.setItem(
      'cartSessionId',
      sessionId
    );
};