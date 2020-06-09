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
      <Text>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
