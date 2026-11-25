import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const TEXTS: Record<string, { title: string; rows: [string, string][] }> = {
  orders: {
    title: 'Тапсырыстар',
    rows: [
      ['Тапсырыс №1048', 'Жеткізілді • $14.97'],
      ['Тапсырыс №1042', 'Жеткізілді • $8.48'],
    ],
  },
  details: {
    title: 'Менің деректерім',
    rows: [
      ['Аты-жөні', 'Өркен Омирбайулы'],
      ['Email', 'orken.omirbaiuly@example.com'],
    ],
  },
  address: {
    title: 'Жеткізу мекенжайы',
    rows: [
      ['Мекенжай', 'Қызылорда қ.'],
      ['Уақыты', '30–45 минут'],
    ],
  },
  payment: {
    title: 'Төлем әдістері',
    rows: [['Карта', '•••• 4821']],
  },
  promo: {
    title: 'Промокарта',
    rows: [
      ['Код', 'NECTAR10 (-10%)'],
      ['Бонус', '$5.00'],
    ],
  },
  notifications: {
    title: 'Хабарландырулар',
    rows: [['Күйі', 'Қосулы']],
  },
  help: {
    title: 'Көмек',
    rows: [['Пошта', 'support@nectar.kz']],
  },
  about: {
    title: 'Қосымша туралы',
    rows: [
      ['Атауы', 'Nectar'],
      ['Нұсқасы', '1.0.0'],
    ],
  },
};

export const AccountDetailScreen = ({ route, navigation }: any) => {
  const key = route?.params?.section || 'about';
  const info = TEXTS[key] || TEXTS.about;

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.title}>{info.title}</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.body}>
        {info.rows.map(([k, v], i) => (
          <View key={i} style={styles.box}>
            <Text style={styles.k}>{k}</Text>
            <Text style={styles.v}>{v}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AccountDetailScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  title: { fontSize: 18, fontWeight: '700', color: '#181725' },
  body: { padding: 20, gap: 12 },
  box: { backgroundColor: '#F7F8F7', padding: 16, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between' },
  k: { color: '#7C7C7C', fontWeight: '600' },
  v: { color: '#181725', fontWeight: '700' },
});