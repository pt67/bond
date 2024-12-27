import React from 'react';
import { View, Text, StyleSheet, Linking} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Linker(){

  const handlePress = () => { Linking.openURL('https://www.prakash360.com.np') };

  return (
    <View style={styles.container}>
    <ThemedView style={styles.flexer}>
      <ThemedText style={styles.textContent}>
      <Text style={styles.link} onPress={handlePress}> Visit Developer Website

      </Text>
      </ThemedText>
   

    </ThemedView>
    
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafa',
    textAlign: 'center',
  },

  textContent: {
   color:"green"

  },
  flexer:{
    backgroundColor:'transparent'
  },

  link:{
    color:'blue'
  },
});
