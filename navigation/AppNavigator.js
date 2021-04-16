import React  from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import  StartupScreen, { screenOptions as StartupScreenOptions } from '../screens/StartupScreen';
import ProductsOverViewScreen, { screenOptions as ProductsOverViewScreenOptions } from '../screens/shop/ProductsOverviewScreen';


const ProductsStackNavigator = createStackNavigator();

export const StartUpNavigator = () => {
   return (
      <StartUpStackNavigator.Navigator>

       <StartUpStackNavigator.Screen 
        name="StartUpScreen"
        component={StartupScreen}
        options={StartupScreenOptions}
       /> 

      </StartUpStackNavigator.Navigator>
   );
};


const StartUpStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
      <ProductsStackNavigator.Navigator>
        
        <ProductsStackNavigator.Screen
          name="ProductsOverview"
          component={ProductsOverViewScreen}
          options={ProductsOverViewScreenOptions}
      />

      </ProductsStackNavigator.Navigator>
  );
};


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
     <ShopDrawerNavigator.Navigator
     drawerContentOptions={{
      activeTintColor: '#000' 
    }}
     >

<ShopDrawerNavigator.Screen
        name="Categorii"
        component={StartUpNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons 
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
            />
          )
        }}
      />      
      
    <ShopDrawerNavigator.Screen
        name="Produse"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons 
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
            />
          )
        }}
      />
      
     </ShopDrawerNavigator.Navigator>
  );
};


const AppNavigator = () => {
    return (
      <NavigationContainer>
          <ShopNavigator /> 
      </NavigationContainer>      
    );
};



export default AppNavigator;