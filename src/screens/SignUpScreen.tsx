import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ChevronLeft, User, Phone, Lock } from 'lucide-react-native';

export const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name.trim() || phone.trim().length < 5 || password.length < 4) {
      setError('Аты-жөніңізді, нөмірді және құпиясөзді (кемі 4 таңба) толтырыңыз');
      return;
    }
    setError('');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { userName: name.trim() } }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft color="#181725" size={26} />
        </TouchableOpacity>

        <Text style={styles.title}>Тіркелу</Text>
        <Text style={styles.subtitle}>Деректеріңізді енгізіп, дүкенге кіріңіз</Text>

        <Text style={styles.fieldLabel}>Аты-жөніңіз</Text>
        <View style={styles.inputBox}>
          <User size={19} color="#53B175" />
          <TextInput
            style={styles.input}
            placeholder="Мысалы: Әлихан"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.fieldLabel}>Телефон нөмірі</Text>
        <View style={styles.inputBox}>
          <Phone size={19} color="#53B175" />
          <TextInput
            style={styles.input}
            placeholder="+7 701 000 00 00"
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.fieldLabel}>Құпиясөз</Text>
        <View style={styles.inputBox}>
          <Lock size={19} color="#53B175" />
          <TextInput
            style={styles.input}
            placeholder="Құпиясөз ойлап табыңыз"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} activeOpacity={0.85}>
          <Text style={styles.submitText}>Тіркелу және кіру</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>
            Аккаунтыңыз бар ма? <Text style={styles.loginBold}>Кіру</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, flexGrow: 1 },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#181725' },
  subtitle: { fontSize: 14, color: '#7C7C7C', marginTop: 6, marginBottom: 24 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#4A4A55', marginBottom: 8 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    gap: 10,
    marginBottom: 18,
  },
  input: { flex: 1, fontSize: 15, color: '#181725' },
  errorText: { color: '#D9383A', fontSize: 13, marginBottom: 12, fontWeight: '500' },
  submitBtn: {
    backgroundColor: '#53B175',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginLinkText: { color: '#7C7C7C', fontSize: 14 },
  loginBold: { color: '#53B175', fontWeight: '700' },
});