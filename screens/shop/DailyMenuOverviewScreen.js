import React, { useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';


const DailyMenuOverviewScreen = () => {

  const radioButtonsData = [{
    id: '1',
    label: 'Option 1',
    value: 'valoare1'
    },
    {
        id: '2',
        label: 'Option 2',
        value: 'valoare2'
    }];

    const radioButtonsData2 = [{
      id: '1',
      label: 'Option 3',
      value: 'valoare3'
      },
      {
          id: '2',
          label: 'Option 4',
          value: 'valoare4'
      }];

    

const [radioButtons, setRadioButtons] = useState(radioButtonsData);

const [radioButtons2, setRadioButtons2] = useState(radioButtonsData2);

  function onPressRadioButton(radioButtonsArray) {
    //console.log(radioButtonsArray);
    //const menuId = radioButtonsArray[id];
    //console.log(menuId);
    setRadioButtons(radioButtonsArray);
    console.log(radioButtons);

      for (key in radioButtons) {
          console.log(radioButtons['value']);
      }

  }


  function onPressRadioButton2(radioButtonsArray) {
    //console.log(radioButtonsArray);
    //const menuId = radioButtonsArray[id];
    //console.log(menuId);
    //setRadioButtons2(radioButtonsArray);
  }


    return (
       <ScrollView>
         <View styles={styles.infoSchedule}>
           <Text styles={styles.infoScheduleText}>Meniul zilei - Se poate comanda zilnic intre orele 00:00:00 | 13:00:00</Text>
           </View>
        
        <View style={styles.dailyOptions}>
          <Text> Ciorbe / Supe</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />

          <RadioGroup 
            radioButtons={radioButtons2} 
            onPress={onPressRadioButton2} 
        />
        </View>

        <View style={styles.dailyOptions}>
          <Text> Fel principal</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />

          <RadioGroup 
            radioButtons={radioButtons2} 
            onPress={onPressRadioButton2} 
        />
        </View>

        <View style={styles.dailyOptions}>
          <Text> Garnituri</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />

          <RadioGroup 
            radioButtons={radioButtons2} 
            onPress={onPressRadioButton2} 
        />
        </View>        

        <View style={styles.dailyOptions}>
          <Text> Salate</Text>
          <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />

          <RadioGroup 
            radioButtons={radioButtons2} 
            onPress={onPressRadioButton2} 
        />
        </View> 

      </ScrollView>  
    );
};


export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.categoryName
  };
};
      
  
const styles = StyleSheet.create({
  infoSchedule: {
    marginTop: 30
  },
  infoScheduleText: {
    fontSize: 40
  },
  dailyOptions: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});
    
export default DailyMenuOverviewScreen;