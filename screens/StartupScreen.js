import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';

import HeaderButton from '../components/UI/HeaderButton';
import ProductItem from '../components/shop/ProductItem';
import * as categoriesActions from '../store/actions/categories'; 


const StartupScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const categories = useSelector(state => state.categories.availableCategories);
  const dispatch = useDispatch();


const loadCategories = () => {
    setIsRefreshing(true);
    console.log("se refreseaza ");
    setIsRefreshing(false);
}

  useEffect(() => {
    dispatch(categoriesActions.fetchCategories());
  }, [dispatch]);

    return ( 
      <FlatList
       onRefresh={loadCategories}
       refreshing={isRefreshing}  
        data={categories}
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
      headerTitle: 'Categorii',
      headerLeft: () =>  ( 
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () =>  (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
                navData.navigation.navigate('Cart')
            }}
          />
        </HeaderButtons>
      )
    };
  };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;