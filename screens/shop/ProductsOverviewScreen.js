import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import ProductItem from '../../components/shop/ProductItem';
import * as carActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products'; 

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
   
  const [currentQty, setcurrentQty]= useState([]);


 const increaseQtyHandler =  (index, productId) => {
      let qty = currentQty[index];
        
      if(qty !== undefined) {
        currentQty[index] =  currentQty[index] + 1;
        } else {
         currentQty[index] = 2;
        }        
        setcurrentQty({...currentQty});
        dispatch(carActions.addQuantity(productId, currentQty[index]));
    }


const decreaseQtyHandler = (index, productId) =>  {

    if (currentQty[index] > 1) {
      currentQty[index] =  currentQty[index] - 1;
    
      setcurrentQty({...currentQty});
      dispatch(carActions.addQuantity(productId, currentQty[index])); 
    }
}

  const cars = useSelector(state => state.cart.cars);
  const products = useSelector(state => state.products.availableProducts);
  const quantities = useSelector(state => state.cart.quantities);
  

const dispatch = useDispatch();

const loadProducts = useCallback(async () => {
  setError(null);  
  setIsRefreshing(true);

  try {
    const categoryId = props.route.params.categoryId; 
    await dispatch(productsActions.fetchProducts(categoryId));

  } catch (err) {
    setError(err.message)
  }
  setIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const categoryId = props.route.params.categoryId;
    dispatch(productsActions.fetchProducts(categoryId));
    
  }, [dispatch]);


  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'focus',
      loadProducts
    );

      return () => {
        unsubscribe();
      };
  },[loadProducts])


  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  
  list = (id) => {
    return cars.map((element) => {
      if(id == element.id) {
        return (
          <View key={element.id} style={{margin: 10}}>
            <Text>We have a match {element.id} !!!</Text>
          </View>
        );
      } else {
        return (
          <View key={element.id} style={{margin: 10}}>
            <Text>Ohh no we do not have amatch!!!</Text>
          </View>
        );      
      }

    });
  };



  if (error) {
    console.log(error);
    return (<View style={styles.centered}>
      <Text>An error occurred!</Text>
      <Button 
        title="Try again" 
        onPress={loadProducts} 
        color={Colors.primary}/>
  </View>)
  }
  
    if(isLoading) {
      return (<View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>)
    }
  
    if (!isLoading && products.length === 0) {
      return (<View style={styles.centered}>
          <Text>Nu exista produse</Text>
      </View>)
    }
  
    return ( 
      
      <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}  
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ProductItem
          id={item.id}
          image={item.picturFullLink}
          name={item.name}
          >
      <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
         
         <View style={styles.wrapperInfo}>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>{item.price} Lei</Text>
            </View>
 
          <View style={styles.quantityWrapper}>
              <View style={styles.callOut}> 
                <View style={styles.qtyBtnDecrease}>
                <Button 
                    title="-" 
                    onPress={() => decreaseQtyHandler(index,item.id)}
                    color={Colors.secondary}
                    style={styles.qtyBty} >
                    </Button>
                </View>
 


                <View style={styles.qtyTxt}>
                      {currentQty[index] ? <Text>{currentQty[index]}</Text>: <Text>1</Text>}
                </View>
                <View style={styles.qtyBtnIncrease}>
                  <Button 
                  title="+" 
                  onPress={() => increaseQtyHandler(index,item.id)}
                  color={Colors.secondary}
                  style={styles.qtyBty}
                  ></Button>
                </View>
            </View>
          </View>

        </View>                   
         
     <TouchableOpacity> 
      <View styles={styles.wrapperAddToCart}>
          <Button  styles={styles.addToCart}
            color={Colors.primary}
            title="Adauga in cos"
            onPress={() => {
              data => setTextInputHolder(data)
              dispatch(carActions.addToCart(item.id));
            }}
          />
          </View>
        </TouchableOpacity>
        </ProductItem>
      )}
      >
      </FlatList>
    );
};

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.categoryName
  };
};

const styles = StyleSheet.create({
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20
  }, 
  wrapperInfo: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingBottom: 15
  },
  priceWrapper: {
    flex: 1
  },
  price: {
    paddingLeft: 10,
    color: Colors.primary
  },
  quantityWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  callOut: {
    display: 'flex',
    flexDirection: 'row',
    padding: 2,
    flexBasis: '30%',
    justifyContent: 'space-between'
  },
  minusSign: {
    flex: 1
  },
  plusSign: {
    flex: 3
  },
  quantity: {
    flex: 2,
    paddingRight: 10,
  },
  input: {
    height: 30,
    width: '40%',
    margin: 2,
    borderWidth: 1,
    textAlign: 'center',
    color: "#000"
  },
  wrapperAddToCart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40
  },
  addToCart: {
    marginBottom: 40,
    height: 50,
    paddingBottom: 20
  },
  qtyBtnIncrease: {
    flexBasis: '40%',
    marginRight: 10
  },
  qtyBtnDecrease: {
    flexBasis: '40%',
  },
  qtyTxt: {
    flexBasis: '20%',
    marginTop: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default ProductsOverviewScreen;