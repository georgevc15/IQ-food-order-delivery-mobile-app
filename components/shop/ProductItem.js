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
      <TouchableOpacity>
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




      </TouchableOpacity>
      </View>
    </Card>  
    );
};

const styles = StyleSheet.create({
    product: {
      height: 230,
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
        overflow: 'hidden'
      },
      image: {
        width: '100%',
        height: '100%'
      },
      actions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
      }
  });

  export default ProductItem;