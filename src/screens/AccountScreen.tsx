import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { ShoppingBag, FileText, MapPin, CreditCard, Tag, Bell, HelpCircle, Info, ChevronRight, LogOut, Pencil } from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';

const ITEMS = [
  { key: 'orders', label: 'Тапсырыстар', icon: ShoppingBag },
  { key: 'details', label: 'Менің деректерім', icon: FileText },
  { key: 'address', label: 'Жеткізу мекенжайы', icon: MapPin },
  { key: 'payment', label: 'Төлем әдістері', icon: CreditCard },
  { key: 'promo', label: 'Промокарта', icon: Tag },
  { key: 'notifications', label: 'Хабарландырулар', icon: Bell },
  { key: 'help', label: 'Көмек', icon: HelpCircle },
  { key: 'about', label: 'Қосымша туралы', icon: Info },
];

export const AccountScreen = ({ navigation }: any) => {
  const go = (section: string) => navigation.navigate('AccountDetail', { section });

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profile}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' }} style={styles.avatar} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.name}>Өркен Омирбайулы</Text>
              <TouchableOpacity onPress={() => go('details')}>
                <Pencil size={14} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.email}>orken.omirbaiuly@example.com</Text>
          </View>
        </View>

        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity key={item.key} style={styles.row} onPress={() => go(item.key)}>
              <View style={styles.left}>
                <Icon size={20} color="#181725" />
                <Text style={styles.label}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color="#181725" />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.logout} onPress={() => navigation.replace('SignIn')}>
          <LogOut size={20} color="#53B175" />
          <Text style={styles.logoutText}>Шығу</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav active="Account" navigation={navigation} />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 110 },
  profile: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 14, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  avatar: { width: 62, height: 62, borderRadius: 31 },
  name: { fontSize: 18, fontWeight: '700', color: '#181725' },
  email: { fontSize: 13, color: '#7C7C7C', marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  label: { fontSize: 16, fontWeight: '600', color: '#181725' },
  logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, margin: 20, height: 56, borderRadius: 18, backgroundColor: '#F2F3F2' },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#53B175' },
});