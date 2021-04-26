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
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';

import HeaderButton from '../components/UI/HeaderButton';
import CategoryItem from '../components/shop/CategoryItem';
import * as categoriesActions from '../store/actions/categories'; 


const StartupScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const categories = useSelector(state => state.categories.availableCategories);
  const dispatch = useDispatch();


const loadCategories = useCallback(async () => {
  setError(null);  
  setIsRefreshing(true);
  try {
    await dispatch(categoriesActions.fetchCategories());
  } catch (err) {
    setError(err.message)
  }
  setIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    dispatch(categoriesActions.fetchCategories());
  }, [dispatch]);


  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'focus',
      loadCategories
    );

      return () => {
        unsubscribe();
      };
  },[loadCategories])

  useEffect(() => {
    setIsLoading(true);
    loadCategories().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategories]);

const selectItemHandler = (id, name, tip) => {
     if(tip == 1) {
      props.navigation.navigate('DailyMenuOverview', {
        categoryName: name
    });
     } else {
      props.navigation.navigate('ProductsOverview', {
        categoryId: id,
        categoryName: name
    });
     }

};

  if (error) {
    console.log(error);
    return (<View style={styles.centered}>
      <Text>An error occurred!</Text>
      <Button 
        title="Try again" 
        onPress={loadCategories} 
        color={Colors.primary}/>
  </View>)
  }
  
    if(isLoading) {
      return (<View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>)
    }
  
    if (!isLoading && categories.length === 0) {
      return (<View style={styles.centered}>
          <Text>Nu exista categorii</Text>
      </View>)
    }


    return ( 
      <FlatList
       onRefresh={loadCategories}
       refreshing={isRefreshing}  
        data={categories}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CategoryItem
          id={itemData.item.id}
          image={itemData.item.picturFullLink}
          name={itemData.item.name}
          onSelect={() => {
            selectItemHandler(
              itemData.item.id,
              itemData.item.name,
              itemData.item.name === "Meniul zilei" ? 1 : 0
              )
          }}
          >
          <Button 
            color={Colors.primary}
            title={itemData.item.name}
            onPress={() => {
              selectItemHandler(
                itemData.item.id,
                itemData.item.name,
                itemData.item.name === "Meniul zilei" ? 1 : 0
                )
            }}
          />
          </CategoryItem>
      )}
      >
      </FlatList>
    );
};


export const screenOptions = navData => {
    return {
      headerTitle: 'Bine ati venit',
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