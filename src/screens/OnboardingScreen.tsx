import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Carrot } from 'lucide-react-native';

export const OnboardingScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000' }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Carrot color="#FFFFFF" size={44} style={styles.icon} />
        <Text style={styles.title}>Welcome{'\n'}to our store</Text>
        <Text style={styles.subtitle}>
          Ger your groceries in as fast as one hour
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 30,
    paddingBottom: 60,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  button: {
    backgroundColor: '#53B175',
    width: '100%',
    height: 62,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});