import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { MapPin, Search, Plus } from 'lucide-react-native';
import { ALL_PRODUCTS, ProductItem, useStore } from '../types/store';
import { BottomNav } from '../components/BottomNav';

const ProductCard = ({
  item,
  navigation,
  onAdd,
}: {
  item: ProductItem;
  navigation: any;
  onAdd: (p: ProductItem) => void;
}) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.85}
    onPress={() => navigation.navigate('ProductDetail', { product: item })}
  >
    <Image source={{ uri: item.imageUri }} style={styles.cardImg} />
    <Text numberOfLines={1} style={styles.cardTitle}>
      {item.name}
    </Text>
    <Text style={styles.cardWeight}>{item.weight}</Text>
    <View style={styles.cardBottom}>
      <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={(e) => {
          e.stopPropagation();
          onAdd(item);
        }}
      >
        <Plus size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export const HomeScreen = ({ navigation, route }: any) => {
  const { addToCart } = useStore();
  const location = route?.params?.location || 'Қазақстан, Алматы';
  const [searchText, setSearchText] = useState('');

  const exclusive = ALL_PRODUCTS.filter((p) => p.section === 'exclusive');
  const bestSelling = ALL_PRODUCTS.filter((p) => p.section === 'best');
  const groceries = ALL_PRODUCTS.filter((p) => p.section === 'groceries');

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBrand}>
          <Text style={styles.carrot}>🥕</Text>
          <View style={styles.locRow}>
            <MapPin size={16} color="#181725" />
            <Text style={styles.locText}>{location}</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Search size={18} color="#181725" />
          <TextInput
            style={styles.searchInput}
            placeholder="Дүкеннен іздеу"
            placeholderTextColor="#7C7C7C"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() =>
              navigation.navigate('Search', { initialQuery: searchText })
            }
          />
        </View>

        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTitle}>Жаңа көкөністер</Text>
            <Text style={styles.bannerSub}>40%-ға дейін ЖЕҢІЛДІК</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600',
            }}
            style={styles.bannerImg}
          />
        </View>

        <View style={styles.secHeader}>
          <Text style={styles.secTitle}>Арнайы ұсыныс</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeAll}>Барлығы</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {exclusive.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              navigation={navigation}
              onAdd={(p) => addToCart(p, 1)}
            />
          ))}
        </ScrollView>

        <View style={styles.secHeader}>
          <Text style={styles.secTitle}>Көп сатылатындар</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeAll}>Барлығы</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {bestSelling.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              navigation={navigation}
              onAdd={(p) => addToCart(p, 1)}
            />
          ))}
        </ScrollView>

        <View style={styles.secHeader}>
          <Text style={styles.secTitle}>Азық-түлік</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>Барлығы</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          <TouchableOpacity
            style={[styles.pill, { backgroundColor: '#FDEFE2' }]}
            onPress={() => navigation.navigate('Search')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300',
              }}
              style={styles.pillImg}
            />
            <Text style={styles.pillText}>Бұршақ тұқымдас</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pill, { backgroundColor: '#E9F6EE' }]}
            onPress={() => navigation.navigate('Search')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=300',
              }}
              style={styles.pillImg}
            />
            <Text style={styles.pillText}>Күріш</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.hRow, { marginTop: 12 }]}
        >
          {groceries.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              navigation={navigation}
              onAdd={(p) => addToCart(p, 1)}
            />
          ))}
        </ScrollView>
      </ScrollView>

      <BottomNav active="Shop" navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 100 },
  topBrand: { alignItems: 'center', marginTop: 10, marginBottom: 12 },
  carrot: { fontSize: 28, marginBottom: 4 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locText: { fontSize: 16, fontWeight: '600', color: '#4C4F4D' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#181725' },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAF6EC',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerTitle: { fontSize: 20, fontWeight: '700', color: '#181725' },
  bannerSub: { fontSize: 13, fontWeight: '600', color: '#53B175', marginTop: 4 },
  bannerImg: { width: 84, height: 64, borderRadius: 12 },
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  secTitle: { fontSize: 20, fontWeight: '700', color: '#181725' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#53B175' },
  hRow: { paddingHorizontal: 20, gap: 14, marginBottom: 18 },
  card: {
    width: 162,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  cardImg: { width: '100%', height: 92, borderRadius: 12, marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#181725' },
  cardWeight: { fontSize: 12, color: '#7C7C7C', marginTop: 2, marginBottom: 12 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: { fontSize: 17, fontWeight: '700', color: '#181725' },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 12,
    minWidth: 160,
  },
  pillImg: { width: 44, height: 44, borderRadius: 22 },
  pillText: { fontSize: 16, fontWeight: '700', color: '#181725' },
});