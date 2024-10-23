import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenue dans notre Projet Étudiant !</Text>
      <Text style={styles.subtitle}>
        Cette application a été réalisée dans le cadre d'un projet de 2ème année en React Native.
      </Text>
      <Text style={styles.description}>
        Parcourez les différentes sections pour découvrir les fonctionnalités que nous avons développées.
        Ce projet vise à centraliser plusieurs outils dans une interface simple et accessible pour toute la famille.
      </Text>
      <Text style={styles.footer}>Merci de tester notre application et de nous donner vos retours !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#004d40',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#004d40',
    marginHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {
    fontSize: 14,
    color: '#004d40',
    textAlign: 'center',
    marginTop: 20,
  },
});
