import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Carrot, Eye, EyeOff } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Carrot color="#F3603F" size={48} />
      </View>

      <Text style={styles.title}>Loging</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          {secure ? <EyeOff color="#7C7C7C" size={20} /> : <Eye color="#7C7C7C" size={20} />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Singup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC', padding: 25 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 50 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#7C7C7C', marginBottom: 35 },
  label: { fontSize: 15, color: '#7C7C7C', marginBottom: 8 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    fontSize: 17,
    paddingBottom: 10,
    marginBottom: 25,
    color: '#181725',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  passwordInput: { flex: 1, fontSize: 17, color: '#181725' },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 15, marginBottom: 30 },
  forgotText: { color: '#181725', fontSize: 14 },
  loginBtn: {
    backgroundColor: '#53B175',
    height: 62,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  bottomText: { color: '#181725', fontSize: 14, fontWeight: '600' },
  signupLink: { color: '#53B175', fontSize: 14, fontWeight: '600' },
});