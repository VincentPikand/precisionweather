import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [response, setResponse] = useState('')

  useEffect(() => {
    fetch('http://0ec89952065c.ngrok.io/weatherapi').then((response) => (
      response.text()
    )).then((res) => {
      setResponse(res);
    }).catch((error) => {
      console.log(error.message)
      throw error;
    })
  })

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Precision Weather</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#8d8eb2',
    flexDirection: 'column'
  },
  top: {
    backgroundColor: '#cecbdd',
    height: 100,
    width: 100,
  }
});
