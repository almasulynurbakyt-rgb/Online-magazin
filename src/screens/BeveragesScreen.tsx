import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ChevronLeft, SlidersHorizontal, Plus } from 'lucide-react-native';
import { ALL_PRODUCTS, useStore } from '../types/store';

export const BeveragesScreen = ({ navigation, route }: any) => {
  const { addToCart } = useStore();
  const title = route?.params?.initialCategory || 'Сусындар';
  const drinks = ALL_PRODUCTS.filter((p) => p.category === 'Сусындар');

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <SlidersHorizontal size={20} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {drinks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.imageUri }} style={styles.img} />
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.weight}>{item.weight}</Text>
            <View style={styles.bottom}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  addToCart(item, 1);
                }}
              >
                <Plus size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeveragesScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#181725' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 40,
  },
  card: {
    width: '47.5%',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 12,
  },
  img: { width: '100%', height: 92, borderRadius: 12, marginBottom: 10 },
  name: { fontSize: 15, fontWeight: '700', color: '#181725' },
  weight: { fontSize: 12, color: '#7C7C7C', marginTop: 2, marginBottom: 12 },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 17, fontWeight: '700', color: '#181725' },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
});