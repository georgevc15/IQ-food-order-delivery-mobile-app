import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { useFonts } from 'expo-font'; 

import categoriesReducer from './store/reducers/categories';
import productsReducer from './store/reducers/products';

import AppNavigator from './navigation/AppNavigator';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer
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


