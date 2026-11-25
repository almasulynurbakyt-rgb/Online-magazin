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

export const NumberScreen = ({ navigation, route }: any) => {
  const initialCountry = route?.params?.country || {
    flag: '🇰🇿',
    dialCode: '+7',
    name: 'Қазақстан',
  };

  const [prefix, setPrefix] = useState(initialCountry.dialCode);
  const [phone, setPhone] = useState('');

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

          <Text style={styles.title}>Телефон нөміріңізді жазыңыз</Text>
          <Text style={styles.label}>Ел коды мен нөмірді өзіңіз енгізіңіз</Text>

          <View style={styles.inputRow}>
            <Text style={styles.flag}>{initialCountry.flag}</Text>
            <TextInput
              style={styles.prefixInput}
              value={prefix}
              onChangeText={setPrefix}
              keyboardType="phone-pad"
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              autoFocus
              value={phone}
              onChangeText={setPhone}
              placeholder="701 234 56 78"
              placeholderTextColor="#A0A0A0"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() =>
              navigation.navigate('Verification', {
                fullPhone: `${prefix} ${phone}`.trim(),
              })
            }
          >
            <ChevronRight color="#FFFFFF" size={28} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { flex: 1, justifyContent: 'space-between', padding: 24 },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: { fontSize: 26, fontWeight: '700', color: '#181725', marginBottom: 8 },
  label: { fontSize: 14, color: '#7C7C7C', marginBottom: 24 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 60,
    gap: 8,
  },
  flag: { fontSize: 22 },
  prefixInput: {
    width: 56,
    fontSize: 18,
    fontWeight: '700',
    color: '#181725',
    borderRightWidth: 1,
    borderRightColor: '#DCDFE4',
    paddingRight: 8,
  },
  input: { flex: 1, fontSize: 18, color: '#181725', fontWeight: '500' },
  footer: { alignItems: 'flex-end', marginBottom: 12 },
  nextBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});