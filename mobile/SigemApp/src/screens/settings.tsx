import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.text}>Aqui você pode ajustar suas preferências.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070419',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default Settings;
