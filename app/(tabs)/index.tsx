import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { equipments } from './data';

const HomeScreen: React.FC = () => {
  const [machine, setMachineFound] = useState([]);
  const [snumber, onChangeNumber] = useState('');

  const checkUser = async () => {
    const checker = equipments.filter(e => e.Serial_number === parseInt(snumber));
    setMachineFound(checker);
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Track Users</ThemedText>
        <HelloWave />
      </ThemedView>

      <SafeAreaProvider>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={snumber}
            placeholder="Serial Number"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} >
            <FontAwesome.Button name="search" backgroundColor="#3b5998" onPress={checkUser}>
              <ThemedText>Track</ThemedText>
            </FontAwesome.Button>
          </TouchableOpacity>

          {machine.length > 0 ? (
            <View style={styles.list}>
              <Text>User: {machine[0].Name}</Text>
              <Text>Location: {machine[0].Location}</Text>
              <Text>Issued On: {machine[0].Issue_Date}</Text>
            </View>
          ) : (
            <Text>No Users</Text>
          )}
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
    width: 250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafa',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  list:{
    paddingTop: 12,

  }
});

export default HomeScreen;
