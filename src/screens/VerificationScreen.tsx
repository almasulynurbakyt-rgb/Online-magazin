import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export const VerificationScreen = ({ navigation }: any) => {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft color="#181725" size={28} />
          </TouchableOpacity>

          <Text style={styles.title}>Enter your 4-digit code</Text>
          <Text style={styles.label}>Code</Text>

          <TextInput
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            value={code}
            onChangeText={setCode}
            placeholder="- - - -"
            placeholderTextColor="#181725"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => navigation.navigate('SelectLocation')}
          >
            <ChevronRight color="#FFFFFF" size={28} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCFCFC' },
  inner: { flex: 1, justifyContent: 'space-between', padding: 25 },
  backBtn: { marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 25 },
  label: { fontSize: 15, color: '#7C7C7C', marginBottom: 10 },
  codeInput: {
    fontSize: 22,
    letterSpacing: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
    color: '#181725',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resendText: { color: '#53B175', fontSize: 17 },
  nextBtn: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
});