import React  from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import  StartupScreen, { screenOptions as StartupScreenOptions } from '../screens/StartupScreen';
import ProductsOverViewScreen, { screenOptions as ProductsOverViewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import DailyMenuOverviewScreen, { screenOptions as DailyMenuOverViewScreenOptions } from '../screens/shop/DailyMenuOverviewScreen';

import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
  },
  headerBackTitleStyle: {
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};



const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
   return (
   <ProductsStackNavigator.Navigator>
       <ProductsStackNavigator.Screen 
        name="StartUpScreen"
        component={StartupScreen}
        options={StartupScreenOptions}
       />
      <ProductsStackNavigator.Screen 
          name="ProductsOverview"
          component={ProductsOverViewScreen}
          options={ProductsOverViewScreenOptions}
       />
      <ProductsStackNavigator.Screen 
          name="DailyMenuOverview"
          component={DailyMenuOverviewScreen}
          options={DailyMenuOverViewScreenOptions}
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