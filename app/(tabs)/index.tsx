import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {AScanner} from '../../components/EScanner';

import {equipments} from './data';

// import Linker from './linker';
// import Pdf from 'react-native-pdf';


const HomeScreen: React.FC = () => {

  const [text, onChangeText] = useState('Useless Text');
  const [snumber, onChangeNumber] = useState('');

 //console.log(equipments);
//do the actionn on upload book
interface UserInfo{
  name: string;
  serialnumber: string;
} 
  const uinfo: UserInfo[]= [];
  const uploadBook = async () => {
    uinfo.push({
      name:text,
      serialnumber:snumber,
    });
    console.log(uinfo);
    onChangeNumber('');
    onChangeText('')
  };




  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Submit Books</ThemedText>
        <HelloWave />
      </ThemedView>

      <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder = "Book Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={snumber}
          placeholder="Serial Number"
          keyboardType="numeric"
        />

     <TouchableOpacity style={styles.button} >
        <FontAwesome.Button name="paper-plane" backgroundColor="#3b5998" onPress={uploadBook}>
          <ThemedText>Submit</ThemedText>
        </FontAwesome.Button>
      </TouchableOpacity>

      <AScanner/>
  
      <FlatList data={equipments} 
      keyExtractor={(item)=>item.id} 
      renderItem={({ item }) => ( 
        <View> 
          <Text>{item.Serial_number}</Text> 
        </View> 
        )} 
       />
       
      
      </SafeAreaView>
    </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafa'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 80,
    backgroundColor:'transparent'

  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
});

export default HomeScreen;
