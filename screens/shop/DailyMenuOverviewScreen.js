import React, { useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Button,
  TouchableOpacity 
} from 'react-native';
import Colors from '../../constants/Colors';

import Card from '../../components/UI/Card';

const DailyMenuOverviewScreen = () => {


  const soupData = [{
      id: '1',
      label: 'Option 1',
      value: 'valoare1',
      type: 'soup'
    },
    {
      id: '2',
      label: 'Option 2',
      value: 'valoare2',
      type: 'soup'
    }];

    const mainCourseData = [{
      id: '3',
      label: 'Option 3',
      value: 'valoare3',
      type: 'mainCourse'
      },
      {
       id: '4',
       label: 'Option 4',
       value: 'valoare4',
       type: 'mainCourse'
      }];

    const secondCourseData = [{
      id: '5',
      label: 'Option 5',
      value: 'valoare 5'
      },
      {
       id: '6',
       label: 'Option 4',
       value: 'valoare 4'
      }];

      const saladsData = [{
        id: '7',
        label: 'Option 5',
        value: 'valoare 5'
        },
        {
        id: '8',
        label: 'Option 6',
        value: 'valoare 6'
        },
        {
        id: '9',
        label: 'Option 9',
        value: 'valoare 9'
        },
        {
        id: '10',
        label: 'Option 10',
        value: 'valoare 10'
        }
      ];
    

const [soup, setSoup] = useState(soupData);
const [mainCourse, setMainCourse] = useState(mainCourseData);
const [secondCourse, setSecondCourse] = useState(secondCourseData);
const [salads, setSalads] = useState(saladsData);

function onPressChoseSoup(radioButtonsArray) {
    setSoup(radioButtonsArray);
    console.log(soup);

        for (var key in soup) {
          if (soup.hasOwnProperty(key)) {
            if(soup[key]['selected'] == true) {
              console.log(key + " -> " + soup[key]['label']);
            }
          }
        }
    }

    function onPressMainCourse(radioButtonsArray) {
      setMainCourse(radioButtonsArray);
      console.log(mainCourse);
  
          for (var key in mainCourse) {
            if (mainCourse.hasOwnProperty(key)) {
                console.log(key + " -> " + mainCourse[key]['label']);
            }
          }
      }

      function onPressSecondCourse(radioButtonsArray) {
        setSecondCourse(radioButtonsArray);
        console.log(secondCourse);
    
            for (var key in secondCourse) {
              if (secondCourse.hasOwnProperty(key)) {
                  console.log(key + " -> " + secondCourse[key]['label']);
              }
            }
        }

        function onPressSalads(radioButtonsArray) {
          setSalads(radioButtonsArray);
          console.log(salads);
      
              for (var key in salads) {
                if (salads.hasOwnProperty(key)) {
                    console.log(key + " -> " + salads[key]['label']);
                }
              }
          }

    return (
       <ScrollView>
         <Card style={styles.dailyCard}> 
         <View>
           <Text styles={styles.title}> Meniul zilei - Se poate comanda zilnic intre orele 00:00:00 | 13:00:00</Text>
           </View>
        
        <View style={styles.dailyOptions}>
          <Text> Ciorbe / Supe</Text>
          <RadioGroup
            radioButtons={soup} 
            onPress={onPressChoseSoup} 
        />
          <Text> Fel principal </Text>
          <RadioGroup 
            radioButtons={mainCourse} 
            onPress={onPressMainCourse}
        />
          <Text> Garnituri </Text>
          <RadioGroup 
            radioButtons={secondCourse} 
            onPress={onPressSecondCourse}
        />
          <Text> Salate </Text>
          <RadioGroup 
            radioButtons={salads} 
            onPress={onPressSalads}
        />

        </View> 
      
        <TouchableOpacity> 
          <View styles={styles.wrapperAddToCart}>
            <Button  styles={styles.addToCart}
              color={Colors.primary}
              title="Adauga in cos"
              onPress={() => {
                data => setTextInputHolder(data)
                dispatch(carActions.addToCart(item.id));
              }}
            />
            </View>
        </TouchableOpacity>     
      
      </Card>   
      </ScrollView>  
    );
};


export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.categoryName
  };
};
      
  
const styles = StyleSheet.create({
  dailyCard: {
    margin:20
  },
  dailyOptions: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 20
  },
  wrapperAddToCart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40
  },
  addToCart: {
    marginBottom: 40,
    height: 50,
    paddingBottom: 20
  }  
});
    
export default DailyMenuOverviewScreen;