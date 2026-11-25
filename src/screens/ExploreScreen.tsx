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
import { Search } from 'lucide-react-native';
import { BottomNav } from '../components/BottomNav';

const CATEGORIES = [
  {
    title: 'Fresh Fruits & Vegetable',
    bg: '#E8F7EE',
    border: '#B8E6CA',
    imageUri: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=500',
  },
  {
    title: 'Cooking Oil & Ghee',
    bg: '#FFF6E8',
    border: '#F7DFB5',
    imageUri: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500',
  },
  {
    title: 'Meat & Fish',
    bg: '#FDECEC',
    border: '#F7C5C5',
    imageUri: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=500',
  },
  {
    title: 'Bakery & Snacks',
    bg: '#F4EEFC',
    border: '#DDD0F7',
    imageUri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500',
  },
  {
    title: 'Dairy & Eggs',
    bg: '#FFFBE6',
    border: '#F4E7A1',
    imageUri: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=500',
  },
  {
    title: 'Beverages',
    bg: '#EAF4FC',
    border: '#BDDDF7',
    imageUri: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500',
  },
];

export const ExploreScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Find Products</Text>

        <View style={styles.searchBar}>
          <Search size={18} color="#181725" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Store"
            placeholderTextColor="#7C7C7C"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() =>
              navigation.navigate('Search', { initialQuery: query })
            }
          />
        </View>

        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.title}
              style={[
                styles.tile,
                { backgroundColor: cat.bg, borderColor: cat.border },
              ]}
              onPress={() => {
                if (cat.title === 'Beverages') {
                  navigation.navigate('Beverages', { initialCategory: cat.title });
                } else {
                  navigation.navigate('Search', { initialCategory: cat.title });
                }
              }}
            >
              <Image source={{ uri: cat.imageUri }} style={styles.tileImg} />
              <Text style={styles.tileText}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="Explore" navigation={navigation} />
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 100 },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
    marginVertical: 14,
  },
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 14,
  },
  tile: {
    width: '47.5%',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    minHeight: 165,
    justifyContent: 'center',
  },
  tileImg: { width: 84, height: 64, borderRadius: 12, marginBottom: 12 },
  tileText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
  },
});