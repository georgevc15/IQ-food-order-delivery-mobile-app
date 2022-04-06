import React, { useState, useCallback, useEffect } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Button,
  TouchableOpacity 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import Card from '../../components/UI/Card';

import * as dailyMenuInfoActions from '../../store/actions/dailymenuinfo';
import * as dailyMenuItemsActions from '../../store/actions/dailymenuitems';


const DailyMenuOverviewScreen = () => {

  const [isLoading, setIsLoading] = useState(false);
  
  const dailyMenuInfo = useSelector(state => state.dailyMenuInfo.availableDailyMenuInfo);
  const orderStart = dailyMenuInfo.map(x=>x.orderStart); 
  const orderStop = dailyMenuInfo.map(x=>x.orderStop);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(dailyMenuInfoActions.fetchDailyMenuInfo());
  }, [dispatch]);


const dailyMenuItems = useSelector(state => { 
    return state.dailyMenuItems.availableDailyMenuItems;
});


useEffect(() => {
    dispatch(dailyMenuItemsActions.fetchDailyMenuItems());
    
}, [dispatch]);


let soupDataItems = [];
let mainDishDataItems = [];
let secondCourseDataItems = [];
let saladsDataItems = [];

  for(var i = 0; i < dailyMenuItems.length; i++) {
    categoryItemId = dailyMenuItems[i]['categoryId'];
    stock = dailyMenuItems[i]['stock'];
    
   if(stock > 0) {
    if(categoryItemId == 1) {
      soupDataItems.push(  
        { 
          id : dailyMenuItems[i]['id'],
          label : dailyMenuItems[i]['name'],
          value : dailyMenuItems[i]['name'],
          type : 'soup'
        })
    }

    if(categoryItemId == 2) {
      mainDishDataItems.push(  
        { 
          id : dailyMenuItems[i]['id'],
          label : dailyMenuItems[i]['name'],
          value : dailyMenuItems[i]['name'],
          type : 'mainDish'
        })
    }

    if(categoryItemId == 4) {
      secondCourseDataItems.push(  
        { 
          id : dailyMenuItems[i]['id'],
          label : dailyMenuItems[i]['name'],
          value : dailyMenuItems[i]['name'],
          type : 'secondCourse'
        })
    }

    if(categoryItemId == 5) {
      saladsDataItems.push(  
        { 
          id : dailyMenuItems[i]['id'],
          label : dailyMenuItems[i]['name'],
          value : dailyMenuItems[i]['name'],
          type : 'salads'
        })
    }
  }

}

const [soup, setSoup] = useState(soupDataItems);
const [mainCourse, setMainCourse] = useState(mainDishDataItems);
const [secondCourse, setSecondCourse] = useState(secondCourseDataItems);
const [salads, setSalads] = useState(saladsDataItems);



const loadDailyMenuItems = useCallback(async () => {
  try {
 
    await dispatch(dailyMenuItemsActions.fetchDailyMenuItems());
    getDataItems(dailyMenuItems);
  } catch (err) {
  }

}, [dispatch, setIsLoading]);


function onPressChoseSoup(radioButtonsArray) {
    setSoup(radioButtonsArray);

        for (var key in soup) {
          if (soup.hasOwnProperty(key)) {
            if(soup[key]['selected'] == true) {
              //console.log(key + " -> " + soup[key]['label']);
            }
          }
        }
    }

    
    function onPressMainCourse(radioButtonsArray) {
      setMainCourse(radioButtonsArray);
      //console.log(mainCourse);
  
          for (var key in mainCourse) {
            if (mainCourse.hasOwnProperty(key)) {
                //console.log(key + " -> " + mainCourse[key]['label']);
            }
          }
      }


      function onPressSecondCourse(radioButtonsArray) {
        setSecondCourse(radioButtonsArray);
        //console.log(secondCourse);
    
            for (var key in secondCourse) {
              if (secondCourse.hasOwnProperty(key)) {
                  //console.log(key + " -> " + secondCourse[key]['label']);
              }
            }
        }

        function onPressSalads(radioButtonsArray) {
          setSalads(radioButtonsArray);
          //console.log(salads);
      
              for (var key in salads) {
                if (salads.hasOwnProperty(key)) {
                   // console.log(key + " -> " + salads[key]['label']);
                }
              }
          }


          useEffect(() => {
            setIsLoading(true);
            loadDailyMenuItems().then(() => {
              setIsLoading(false);
            });
          }, [dispatch, loadDailyMenuItems]);

         if (!isLoading && soup.length === 0) {

           return (<View><Text>Pagina se incarca</Text></View>)

           //reRender = () => {     this.forceUpdate(); };


          //const [, updateState] = useState();
          //useCallback(() => updateState({}), []);
        }
        
        //console.log(soup);

    return (
       <ScrollView>
         <Card style={styles.dailyCard}> 
         <View style={styles.titleWrapper}>
           <Text styles={styles.title}> Meniul zilei se poate comanda zilnic intre orele {orderStart} | {orderStop}  </Text>
           </View>

    <View style={styles.dailyOptions}>
      
      <Text style={styles.titleText}>Alege Ciorbe / Supe</Text>
          <RadioGroup
            radioButtons={soup} 
            onPress={onPressChoseSoup} 
        /> 

      <Text styles={styles.courseTitle}>Alege Fel principal </Text>
          <RadioGroup
            radioButtons={mainCourse} 
            onPress={onPressMainCourse} 
        />        

      <Text styles={styles.courseTitle}>Alege: Garnituri</Text>
          <RadioGroup
            radioButtons={secondCourse} 
            onPress={onPressSecondCourse} 
        />       
        
        <Text styles={styles.courseTitle}>Alege: Salate</Text>
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
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 20
  },
  titleWrapper: {
    margin: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  courseTitle: {
    fontSize: 50,
    fontWeight: "bold"
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