import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export const SignInScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000' }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

        <TouchableOpacity
          style={styles.phoneInputBox}
          onPress={() => navigation.navigate('NumberInput')}
        >
          <Text style={styles.flag}>🇧🇩</Text>
          <Text style={styles.countryCode}>+880</Text>
        </TouchableOpacity>

        <Text style={styles.socialLabel}>Or connect with social media</Text>

        <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialBtn, styles.fbBtn]}>
          <Text style={styles.socialIcon}>f</Text>
          <Text style={styles.socialBtnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerImage: {
    width: '100%',
    height: '42%',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#030303',
    marginBottom: 25,
  },
  phoneInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 12,
    marginBottom: 35,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryCode: {
    fontSize: 18,
    color: '#030303',
  },
  socialLabel: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 14,
    marginBottom: 30,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    borderRadius: 19,
    paddingHorizontal: 30,
    marginBottom: 18,
  },
  googleBtn: {
    backgroundColor: '#5383EC',
  },
  fbBtn: {
    backgroundColor: '#4A66AC',
  },
  socialIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 30,
  },
  socialBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});