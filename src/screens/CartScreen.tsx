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
import { X, Minus, Plus } from 'lucide-react-native';
import { useStore } from '../types/store';
import { BottomNav } from '../components/BottomNav';
import {
  CheckoutSheetModal,
  OrderAcceptedModal,
  OrderFailedModal,
} from './CheckoutModals';

export const CartScreen = ({ navigation }: any) => {
  const { cart, updateQty, removeFromCart, checkout } = useStore();
  const entries = Object.values(cart);
  const total = entries.reduce((sum, e) => sum + e.product.price * e.qty, 0);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [acceptedOpen, setAcceptedOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('Тәсілді таңдау');
  const [promoCode, setPromoCode] = useState('Жеңілдік таңдау');

  const handlePlaceOrder = () => {
    setSheetOpen(false);
    if (total <= 0) {
      setFailedOpen(true);
      return;
    }
    checkout();
    setAcceptedOpen(true);
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <Text style={styles.headerTitle}>Себетім</Text>
      <View style={styles.line} />

      <ScrollView contentContainerStyle={styles.list}>
        {entries.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.empty}>Себет бос.</Text>
            <TouchableOpacity
              style={styles.testErrBtn}
              onPress={() => setFailedOpen(true)}
            >
              <Text style={styles.testErrText}>Қате терезесін тексеру</Text>
            </TouchableOpacity>
          </View>
        ) : (
          entries.map(({ product, qty }) => (
            <View key={product.id} style={styles.row}>
              <Image source={{ uri: product.imageUri }} style={styles.thumb} />
              <View style={styles.info}>
                <View style={styles.top}>
                  <Text style={styles.name}>{product.name}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(product.id)}>
                    <X size={18} color="#7C7C7C" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.weight}>{product.weight}</Text>
                <View style={styles.bottom}>
                  <View style={styles.qtyBox}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQty(product.id, -1)}
                    >
                      <Minus size={15} color="#7C7C7C" />
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQty(product.id, 1)}
                    >
                      <Plus size={15} color="#53B175" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.price}>
                    ${(product.price * qty).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {entries.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => setSheetOpen(true)}
          >
            <Text style={styles.checkoutText}>Тапсырыс беру</Text>
            <View style={styles.pill}>
              <Text style={styles.pillText}>${total.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <CheckoutSheetModal
        visible={sheetOpen}
        total={total}
        deliveryMethod={deliveryMethod}
        promoCode={promoCode}
        onSelectDelivery={() =>
          setDeliveryMethod((prev) =>
            prev === 'Тәсілді таңдау' ? 'Курьермен жеткізу' : 'Алып кету'
          )
        }
        onSelectPromo={() =>
          setPromoCode((prev) =>
            prev === 'Жеңілдік таңдау' ? 'NECTAR10 (-10%)' : 'Жеңілдік таңдау'
          )
        }
        onClose={() => setSheetOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderAcceptedModal
        visible={acceptedOpen}
        onTrackOrder={() => {
          setAcceptedOpen(false);
          navigation.navigate('Account');
        }}
        onBackHome={() => {
          setAcceptedOpen(false);
          navigation.navigate('Home');
        }}
      />

      <OrderFailedModal
        visible={failedOpen}
        onRetry={() => {
          setFailedOpen(false);
          setSheetOpen(true);
        }}
        onBackHome={() => {
          setFailedOpen(false);
          navigation.navigate('Home');
        }}
      />

      <BottomNav active="Cart" navigation={navigation} />
    </SafeAreaView>
  );
};

export default CartScreen;

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
  emptyBox: { alignItems: 'center', marginTop: 40, gap: 14 },
  empty: { textAlign: 'center', color: '#7C7C7C', fontSize: 15 },
  testErrBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F2F3F2',
  },
  testErrText: { fontSize: 13, fontWeight: '600', color: '#181725' },
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  info: { flex: 1 },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: '700', color: '#181725' },
  weight: { fontSize: 13, color: '#7C7C7C', marginTop: 3 },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyVal: { fontSize: 15, fontWeight: '700', color: '#181725' },
  price: { fontSize: 16, fontWeight: '700', color: '#181725' },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 76 },
  checkoutBtn: {
    backgroundColor: '#53B175',
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  pill: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#439760',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
});