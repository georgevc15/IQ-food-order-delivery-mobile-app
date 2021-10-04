import AsyncStorage from '@react-native-async-storage/async-storage';
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';


export const addQuantity = (productId, quantity) => {
       return async (dispatch, getState) => {
        
            dispatch({
                type: ADD_QUANTITY,
                quantities: {
                    id: productId,
                    quantity: quantity
                }
            });
        }
}


export const addToCart = (productId) => {
    return async (dispatch, getState) => {
   
        const existingQuantities = getState().cart.quantities; 
        
        const userData = await AsyncStorage.getItem('cartSessionId');
        if(userData == '') {
            const sessionId = makeid(10);
            saveSessionIdToStorage(sessionId);
        }
        console.log(userData); 

       // console.log(existingQuantities);

        let curQty;
        function getCurQrt() {
             return existingQuantities.map((element) => {
               if(element.id == productId) {
                     curQty = element.quantity;
               } else {
                    curQty = 1;
               }

               return curQty;
             });
           };
        let qty = getCurQrt();  

        //se salveaza in db 
        try {          
            const response = await fetch(
                `https://www.alibabafood.ro/api/products.php?product_id=${productId}&quantity=${qty}&cart_code=${productId}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            //console.log(resData[0]);
            //for (const key in resData) {
               // console.log(key);
           // }
 
        } catch (err) {
             //optional send to custom analytics server
             throw err;  
        }  

    }
};