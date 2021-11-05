import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { useFonts } from 'expo-font'; 

import categoriesReducer from './store/reducers/categories';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import DailyMenuInfoReducer from './store/reducers/dailymenuinfo';

import AppNavigator from './navigation/AppNavigator';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  dailyMenuInfo: DailyMenuInfoReducer
});

//const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //composeWithDevTools()
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


