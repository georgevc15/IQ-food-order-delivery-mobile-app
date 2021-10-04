import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Card from '../../components/UI/Card';


const ProductItem = props => {
 return (
    <Card style={styles.product}>
     <View styles={styles.touchable}>

        <View>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    source={{
                        uri: props.image,
                      }}
                />  
          </View>
       
          <View style={styles.actions}>
                    {props.children}  
           </View>      
        </View>

     
      </View>
    </Card>  
    );
};

const styles = StyleSheet.create({
    product: {
      height: 440,
      margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        paddingBottom: 10
      },
      image: {
        width: '100%',
        height: '100%'
      },
      actions: {
        flex: 1
      }
  });

  export default ProductItem;