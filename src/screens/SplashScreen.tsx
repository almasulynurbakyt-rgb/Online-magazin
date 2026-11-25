import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Carrot } from 'lucide-react-native';

export const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoRow}>
        <Carrot color="#FFFFFF" size={48} strokeWidth={2.5} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>nectar</Text>
          <Text style={styles.subtitle}>o n l i n e   g r o c e r i e t</Text>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
});