import React, { useEffect } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';


const DailyMenuOverviewScreen = () => {
    return (
        <View>
            <Text>
               Meniul zilei
            </Text>
        </View>
    );
};


export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.categoryName
  };
};
      
  
    
export default DailyMenuOverviewScreen;