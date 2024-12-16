import { Text, StyleSheet, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';



export default function HomeScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


useEffect(()=>{
// Use dynamic import to prevent errors on the web.
let PdfComponent = null;

if (Platform.OS !== 'web') {
  // Import react-native-pdf only for iOS/Android
  try { PdfComponent = require('react-native-pdf'); } 
  catch (error) {
     console.error('Error loading PdfComponent:', error);
}}

}, []);






  const uploadBook = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Allow PDF files only
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setIsLoading(true); // Show loading state
        setSelectedFile(result); // Update the selected file state
        setIsLoading(false); // Hide loading state after file is set
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error while picking document:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Book Store</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Book One</ThemedText>
        <ThemedText>To open developer tools.</ThemedText>

        {isLoading ? (
          <ThemedText>Loading PDF...</ThemedText>
        ) : selectedFile ? (
          Platform.OS !== 'web' && PdfComponent ? (
            <PdfComponent source={{ uri: selectedFile.uri, cache: true }} style={styles.pdf} />
          ) : (
            <Text>PDF is not supported on this platform.</Text>
          )
        ) : (
          <ThemedText>Select a PDF to view</ThemedText>
        )}
      </ThemedView>

      <TouchableOpacity style={styles.button} onPress={uploadBook}>
        <FontAwesome.Button name="plus" backgroundColor="#3b5998">
          Upload PDF
        </FontAwesome.Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 30,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
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
    height: Dimensions.get('window').height,
  },
});
