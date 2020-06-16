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
      <View style={styles.weatherapi}>
        <Text style={styles.title}>Weather Precision</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353839',
    flexDirection: 'column'
  },
  weatherapi: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 44,
    height: 50,
    backgroundColor: '#d1a36e'
  },
  title: {
    fontSize: 30,
    fontFamily: "serif"
  }
});
