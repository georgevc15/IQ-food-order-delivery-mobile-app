import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    FlatList,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products'; 


const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);



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
        renderItem={itemData => (
          <ProductItem
          id={itemData.item.id}
          image={itemData.item.picturFullLink}
          name={itemData.item.name}
          >

      <View style={styles.titleWrapper}>
            <Text style={styles.title}>{itemData.item.name}</Text>
          </View>
         
         <View style={styles.wrapperInfo}>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>{itemData.item.price} Lei</Text>
            </View>
 

          <View style={styles.quantityWrapper}>
            

              <View style={styles.callOut}> 
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  keyboardType="numeric"
                  id={itemData.item.id}
                />
              </View> 


            </View>
          </View>                  

          <View styles={styles.wrapperAddToCart}>
          <Button  styles={styles.addToCart}
            color={Colors.primary}
            title="Adauga in cos"
          />
          </View>

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
    padding: 2,
    flexBasis: '30%'
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
    marginBottom: 40
  },
  addToCart: {
    marginBottom: 40
  }
});

export default ProductsOverviewScreen;