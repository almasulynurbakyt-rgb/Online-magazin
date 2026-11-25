import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import { MapPin, ChevronDown, Check, Navigation } from 'lucide-react-native';

const LOCATIONS_BY_COUNTRY: Record<
  string,
  { country: string; flag: string; cities: string[] }
> = {
  KZ: {
    country: 'Қазақстан',
    flag: '🇰🇿',
    cities: ['Алматы', 'Астана', 'Шымкент', 'Қызылорда', 'Ақтөбе', 'Қарағанды'],
  },
  KG: {
    country: 'Қырғызстан',
    flag: '🇰🇬',
    cities: ['Бішкек', 'Ош', 'Қаракөл'],
  },
  UZ: {
    country: 'Өзбекстан',
    flag: '🇺🇿',
    cities: ['Ташкент', 'Самарқанд', 'Бұхара'],
  },
  TR: {
    country: 'Түркия',
    flag: '🇹🇷',
    cities: ['Ыстанбұл', 'Анкара', 'Анталья'],
  },
};

const COUNTRY_KEYS = Object.keys(LOCATIONS_BY_COUNTRY);

export const SelectLocationScreen = ({ navigation, route }: any) => {
  const userName = route?.params?.userName || 'Қонақ';

  const [countryKey, setCountryKey] = useState<string>('KZ');
  const [city, setCity] = useState<string>('Алматы');
  const [pickerMode, setPickerMode] = useState<'country' | 'city' | null>(null);

  const currentCountryData = LOCATIONS_BY_COUNTRY[countryKey];

  const handleSelectCountry = (key: string) => {
    setCountryKey(key);
    setCity(LOCATIONS_BY_COUNTRY[key].cities[0]);
    setPickerMode(null);
  };

  const handleConfirm = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: {
            userName,
            location: `${currentCountryData.country}, ${city}`,
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MapPin size={32} color="#53B175" />
        </View>

        <Text style={styles.title}>Мекенжайыңызды таңдаңыз</Text>
        <Text style={styles.subtitle}>
          Азық-түлікті жылдам жеткізу үшін еліңіз бен қалаңызды белгілеңіз
        </Text>

        <Text style={styles.label}>Ел</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setPickerMode('country')}
          activeOpacity={0.8}
        >
          <View style={styles.selectorLeft}>
            <Text style={styles.flag}>{currentCountryData.flag}</Text>
            <Text style={styles.selectorText}>{currentCountryData.country}</Text>
          </View>
          <ChevronDown size={20} color="#181725" />
        </TouchableOpacity>

        <Text style={styles.label}>Қала / Аймақ</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setPickerMode('city')}
          activeOpacity={0.8}
        >
          <View style={styles.selectorLeft}>
            <Navigation size={18} color="#53B175" />
            <Text style={styles.selectorText}>{city}</Text>
          </View>
          <ChevronDown size={20} color="#181725" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleConfirm} activeOpacity={0.88}>
          <Text style={styles.submitText}>Растау және дүкенге өту</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={pickerMode !== null} transparent animationType="slide">
        <View style={styles.backdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {pickerMode === 'country' ? 'Елді таңдаңыз' : 'Қаланы таңдаңыз'}
            </Text>

            {pickerMode === 'country' ? (
              <FlatList
                data={COUNTRY_KEYS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  const itemData = LOCATIONS_BY_COUNTRY[item];
                  const active = item === countryKey;
                  return (
                    <TouchableOpacity
                      style={[styles.optionRow, active && styles.optionActive]}
                      onPress={() => handleSelectCountry(item)}
                    >
                      <Text style={styles.flag}>{itemData.flag}</Text>
                      <Text style={styles.optionText}>{itemData.country}</Text>
                      {active && <Check size={18} color="#53B175" />}
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <FlatList
                data={currentCountryData.cities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  const active = item === city;
                  return (
                    <TouchableOpacity
                      style={[styles.optionRow, active && styles.optionActive]}
                      onPress={() => {
                        setCity(item);
                        setPickerMode(null);
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                      {active && <Check size={18} color="#53B175" />}
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setPickerMode(null)}>
              <Text style={styles.closeText}>Жабу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectLocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#EAF7EF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#181725',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A4A55',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F5F7',
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECEEF2',
  },
  selectorLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flag: { fontSize: 20 },
  selectorText: { fontSize: 16, fontWeight: '600', color: '#181725' },
  submitBtn: {
    backgroundColor: '#53B175',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#53B175',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#181725', marginBottom: 12 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  optionActive: { backgroundColor: '#F2FBF5', borderRadius: 12 },
  optionText: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  closeBtn: {
    marginTop: 14,
    backgroundColor: '#181725',
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});