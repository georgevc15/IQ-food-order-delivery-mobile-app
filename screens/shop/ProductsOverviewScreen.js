import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    FlatList,
    ActivityIndicator,

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
    await dispatch(productsActions.fetchProducts());
  } catch (err) {
    setError(err.message)
  }
  setIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    dispatch(productsActions.fetchProducts());
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
          <Button 
            color={Colors.primary}
            title={itemData.item.name}
          />
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
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default ProductsOverviewScreen;