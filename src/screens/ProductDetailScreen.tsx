import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Share,
  Heart,
  Minus,
  Plus,
  Star,
} from 'lucide-react-native';
import { ALL_PRODUCTS, ProductItem, useStore } from '../types/store';

export const ProductDetailScreen = ({ navigation, route }: any) => {
  const product: ProductItem = route?.params?.product || ALL_PRODUCTS[1];
  const { addToCart, favorites, toggleFavorite } = useStore();
  const [qty, setQty] = useState(1);
  const [openDesc, setOpenDesc] = useState(true);

  const isFav = favorites.includes(product.id);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#181725" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Share size={21} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Image source={{ uri: product.imageUri }} style={styles.img} />
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.sub}>{product.weight}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
              <Heart
                size={24}
                color={isFav ? '#EB5757' : '#7C7C7C'}
                fill={isFav ? '#EB5757' : 'none'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.qtyRow}>
            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus size={18} color="#7C7C7C" />
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{qty}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Plus size={18} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${(product.price * qty).toFixed(2)}</Text>
          </View>

          <View style={styles.line} />

          <TouchableOpacity
            style={styles.accHeader}
            onPress={() => setOpenDesc((v) => !v)}
          >
            <Text style={styles.accTitle}>Өнім сипаттамасы</Text>
            <ChevronRight
              size={20}
              color="#181725"
              style={{ transform: [{ rotate: openDesc ? '90deg' : '0deg' }] }}
            />
          </TouchableOpacity>
          {openDesc && <Text style={styles.desc}>{product.description}</Text>}

          <View style={styles.line} />

          <View style={styles.metaRow}>
            <Text style={styles.accTitle}>Тағамдық құндылығы</Text>
            <View style={styles.metaRight}>
              <View style={styles.nutriBadge}>
                <Text style={styles.nutriText}>{product.nutrition}</Text>
              </View>
              <ChevronRight size={20} color="#181725" />
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.metaRow}>
            <Text style={styles.accTitle}>Пікірлер</Text>
            <View style={styles.metaRight}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={15} color="#F3603F" fill="#F3603F" />
                ))}
              </View>
              <ChevronRight size={20} color="#181725" />
            </View>
          </View>

          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => {
              addToCart(product, qty);
              navigation.navigate('Cart');
            }}
          >
            <Text style={styles.ctaText}>Себетке салу</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scroll: { paddingBottom: 32 },
  hero: {
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    padding: 20,
  },
  img: { width: '100%', height: 220, borderRadius: 18 },
  body: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '700', color: '#181725' },
  sub: { fontSize: 14, color: '#7C7C7C', marginTop: 4 },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 20,
  },
  qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyVal: { fontSize: 18, fontWeight: '700', color: '#181725' },
  price: { fontSize: 22, fontWeight: '700', color: '#181725' },
  line: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 14 },
  accHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accTitle: { fontSize: 16, fontWeight: '700', color: '#181725' },
  desc: { fontSize: 13, color: '#7C7C7C', lineHeight: 20, marginTop: 8 },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nutriBadge: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nutriText: { fontSize: 11, fontWeight: '600', color: '#7C7C7C' },
  stars: { flexDirection: 'row', gap: 2 },
  ctaBtn: {
    backgroundColor: '#53B175',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  ctaText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});