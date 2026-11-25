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
import { ChevronRight } from 'lucide-react-native';
import { ALL_PRODUCTS, useStore } from '../types/store';
import { BottomNav } from '../components/BottomNav';

export const FavoritesScreen = ({ navigation }: any) => {
  const { favorites, addAllFavoritesToCart } = useStore();
  const items = ALL_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <SafeAreaView style={styles.wrap}>
      <Text style={styles.headerTitle}>Favourite</Text>
      <View style={styles.line} />

      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.row}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.imageUri }} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.weight}>{item.weight}</Text>
            </View>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <ChevronRight size={20} color="#181725" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addAllBtn}
            onPress={() => {
              addAllFavoritesToCart();
              navigation.navigate('Cart');
            }}
          >
            <Text style={styles.addAllText}>Add All To Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNav active="Favourite" navigation={navigation} />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
    paddingVertical: 14,
  },
  line: { height: 1, backgroundColor: '#E2E2E2' },
  list: { padding: 20, paddingBottom: 160 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: '#181725' },
  weight: { fontSize: 13, color: '#7C7C7C', marginTop: 3 },
  price: { fontSize: 16, fontWeight: '700', color: '#181725' },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 76 },
  addAllBtn: {
    backgroundColor: '#53B175',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAllText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});