import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { X, ChevronRight, Check, ShoppingBag } from 'lucide-react-native';

type SheetProps = {
  visible: boolean;
  total: number;
  deliveryMethod: string;
  promoCode: string;
  onSelectDelivery: () => void;
  onSelectPromo: () => void;
  onClose: () => void;
  onPlaceOrder: () => void;
};

export const CheckoutSheetModal = ({
  visible,
  total,
  deliveryMethod,
  promoCode,
  onSelectDelivery,
  onSelectPromo,
  onClose,
  onPlaceOrder,
}: SheetProps) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.backdrop}>
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>Тапсырысты рәсімдеу</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={22} color="#181725" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.row} onPress={onSelectDelivery}>
          <Text style={styles.label}>Жеткізу</Text>
          <View style={styles.right}>
            <Text style={styles.val}>{deliveryMethod}</Text>
            <ChevronRight size={18} color="#181725" />
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Төлем тәсілі</Text>
          <View style={styles.right}>
            <View style={styles.card}>
              <View style={styles.red} />
              <View style={styles.blue} />
            </View>
            <ChevronRight size={18} color="#181725" />
          </View>
        </View>

        <TouchableOpacity style={styles.row} onPress={onSelectPromo}>
          <Text style={styles.label}>Промокод</Text>
          <View style={styles.right}>
            <Text style={styles.val}>{promoCode}</Text>
            <ChevronRight size={18} color="#181725" />
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Жалпы сома</Text>
          <View style={styles.right}>
            <Text style={styles.val}>${total.toFixed(2)}</Text>
            <ChevronRight size={18} color="#181725" />
          </View>
        </View>

        <Text style={styles.terms}>
          Тапсырыс беру арқылы сіз <Text style={styles.bold}>Шарттар мен ережелерге</Text> келісесіз
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPlaceOrder}>
          <Text style={styles.btnText}>Тапсырыс беру</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export const OrderAcceptedModal = ({
  visible,
  onTrackOrder,
  onBackHome,
}: {
  visible: boolean;
  onTrackOrder: () => void;
  onBackHome: () => void;
}) => (
  <Modal visible={visible} animationType="fade">
    <View style={styles.accepted}>
      <View style={styles.circle}>
        <Check size={42} color="#FFFFFF" strokeWidth={3} />
      </View>
      <Text style={styles.bigTitle}>Сіздің тапсырысыңыз{'\n'}қабылданды</Text>
      <Text style={styles.sub}>Өнімдеріңіз рәсімделді және{'\n'}өңдеу үстінде</Text>
      <TouchableOpacity style={[styles.btn, { width: '100%', marginTop: 40 }]} onPress={onTrackOrder}>
        <Text style={styles.btnText}>Тапсырысты қадағалау</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={onBackHome}>
        <Text style={styles.linkText}>Басты бетке оралу</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export const OrderFailedModal = ({
  visible,
  onRetry,
  onBackHome,
}: {
  visible: boolean;
  onRetry: () => void;
  onBackHome: () => void;
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.backdropCenter}>
      <View style={styles.cardBox}>
        <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={onBackHome}>
          <X size={22} color="#181725" />
        </TouchableOpacity>
        <View style={styles.bagCircle}>
          <ShoppingBag size={50} color="#53B175" />
        </View>
        <Text style={styles.bigTitle}>Қап! Тапсырыс өтпеді</Text>
        <Text style={styles.sub}>Бірдеңе дұрыс болмай қалды.</Text>
        <TouchableOpacity style={[styles.btn, { width: '100%', marginTop: 24 }]} onPress={onRetry}>
          <Text style={styles.btnText}>Қайталап көру</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={onBackHome}>
          <Text style={styles.linkText}>Басты бетке оралу</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  backdropCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  title: { fontSize: 20, fontWeight: '700', color: '#181725' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 16, fontWeight: '600', color: '#7C7C7C' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  val: { fontSize: 15, fontWeight: '700', color: '#181725' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 },
  red: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#EB5757' },
  blue: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2F80ED', marginLeft: -4 },
  terms: { fontSize: 13, color: '#7C7C7C', marginTop: 14 },
  bold: { fontWeight: '700', color: '#181725' },
  btn: { backgroundColor: '#53B175', height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 18 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  accepted: { flex: 1, backgroundColor: '#F7FAF8', justifyContent: 'center', alignItems: 'center', padding: 24 },
  circle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  cardBox: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, alignItems: 'center' },
  bagCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#EAF7EF', justifyContent: 'center', alignItems: 'center', marginVertical: 18 },
  bigTitle: { fontSize: 22, fontWeight: '700', color: '#181725', textAlign: 'center' },
  sub: { fontSize: 14, color: '#7C7C7C', textAlign: 'center', marginTop: 8 },
  link: { marginTop: 14, paddingVertical: 6 },
  linkText: { fontSize: 16, fontWeight: '700', color: '#181725' },
});