import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {
  Search,
  SlidersHorizontal,
  X,
  Check,
  Plus,
} from 'lucide-react-native';
import { ALL_PRODUCTS, useStore } from '../types/store';
import { BottomNav } from '../components/BottomNav';

const FILTER_CATEGORIES = [
  'Жаңа піскен жемістер мен көкөністер',
  'Ет және балық',
  'Сусындар',
  'Сүт өнімдері және жұмыртқа',
  'Кеспе мен макарон',
];

const FILTER_BRANDS = [
  'Жеке топтама',
  'Cocola',
  'Ifad',
  'Kazi Farmas',
];

export const SearchScreen = ({ navigation, route }: any) => {
  const { addToCart } = useStore();
  const [query, setQuery] = useState<string>(route?.params?.initialQuery || '');
  const [cats, setCats] = useState<string[]>(
    route?.params?.initialCategory ? [route.params.initialCategory] : []
  );
  const [brands, setBrands] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const results = useMemo(() => {
    const matched = ALL_PRODUCTS.filter((item) => {
      const qMatch =
        !query.trim() ||
        item.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        item.category.toLowerCase().includes(query.trim().toLowerCase());
      const cMatch = cats.length === 0 || cats.includes(item.category);
      const bMatch = brands.length === 0 || brands.includes(item.brand);
      return qMatch && cMatch && bMatch;
    });

    if (matched.length === 0 && !query.trim() && cats.length > 0) {
      return ALL_PRODUCTS.filter((p) => p.section === 'groceries');
    }

    return matched;
  }, [query, cats, brands]);

  const toggle = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.searchBar}>
          <Search size={18} color="#181725" />
          <TextInput
            style={styles.input}
            placeholder="Өнім іздеу..."
            placeholderTextColor="#7C7C7C"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={16} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterOpen(true)}
        >
          <SlidersHorizontal size={20} color="#181725" />
        </TouchableOpacity>
      </View>

      {cats.length > 0 && (
        <View style={styles.activeCatBar}>
          <Text style={styles.activeCatText}>Санат: {cats.join(', ')}</Text>
          <TouchableOpacity onPress={() => setCats([])}>
            <Text style={styles.clearCatText}>Барлығын көрсету</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.grid}>
        {results.map((item) => (
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

      <Modal visible={filterOpen} animationType="slide">
        <SafeAreaView style={styles.modalWrap}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setFilterOpen(false)}>
              <X size={24} color="#181725" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Сүзгілер</Text>
            <TouchableOpacity
              onPress={() => {
                setCats([]);
                setBrands([]);
              }}
            >
              <Text style={styles.resetText}>Тазарту</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={styles.groupTitle}>Санаттар</Text>
            {FILTER_CATEGORIES.map((c) => {
              const active = cats.includes(c);
              return (
                <TouchableOpacity
                  key={c}
                  style={styles.checkRow}
                  onPress={() => toggle(cats, setCats, c)}
                >
                  <View style={[styles.box, active && styles.boxActive]}>
                    {active && <Check size={14} color="#FFFFFF" />}
                  </View>
                  <Text style={[styles.label, active && styles.labelActive]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <Text style={[styles.groupTitle, { marginTop: 20 }]}>Бренд</Text>
            {FILTER_BRANDS.map((b) => {
              const active = brands.includes(b);
              return (
                <TouchableOpacity
                  key={b}
                  style={styles.checkRow}
                  onPress={() => toggle(brands, setBrands, b)}
                >
                  <View style={[styles.box, active && styles.boxActive]}>
                    {active && <Check size={14} color="#FFFFFF" />}
                  </View>
                  <Text style={[styles.label, active && styles.labelActive]}>
                    {b}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setFilterOpen(false)}
            >
              <Text style={styles.applyText}>Сүзгіні қолдану</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <BottomNav active="Explore" navigation={navigation} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  input: { flex: 1, fontSize: 15, color: '#181725' },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
  },
  activeCatBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  activeCatText: { fontSize: 13, fontWeight: '600', color: '#181725' },
  clearCatText: { fontSize: 13, fontWeight: '600', color: '#53B175' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 100,
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
  modalWrap: { flex: 1, backgroundColor: '#FFFFFF' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#181725' },
  resetText: { fontSize: 15, fontWeight: '600', color: '#53B175' },
  modalBody: {
    flex: 1,
    backgroundColor: '#F2F3F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181725',
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#B1B1B1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  boxActive: { backgroundColor: '#53B175', borderColor: '#53B175' },
  label: { fontSize: 16, color: '#181725', fontWeight: '500' },
  labelActive: { color: '#53B175', fontWeight: '600' },
  modalFooter: { padding: 20, backgroundColor: '#F2F3F2' },
  applyBtn: {
    backgroundColor: '#53B175',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});