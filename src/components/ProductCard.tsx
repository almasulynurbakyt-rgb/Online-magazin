import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Check } from 'lucide-react-native';

interface ProductCardProps {
  name: string;
  weight: string;
  price: string;
  imageUri: string;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  weight,
  price,
  imageUri,
  onAdd,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.weight}>{weight}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AddedToCartToast = ({ onOpenCart }: { onOpenCart: () => void }) => (
  <View style={styles.toast}>
    <View style={styles.toastLeft}>
      <Check color="#FFFFFF" size={18} />
      <Text style={styles.toastText}>Add to Cart</Text>
    </View>
    <TouchableOpacity onPress={onOpenCart}>
      <Text style={styles.openCartText}>Open Cart ›</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  image: { width: '100%', height: 85, marginBottom: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  weight: { fontSize: 14, color: '#7C7C7C', marginTop: 4, marginBottom: 18 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6EB87E',
    paddingHorizontal: 18,
    height: 52,
    borderRadius: 14,
  },
  toastLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toastText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  openCartText: { color: '#FFFFFF', fontSize: 13 },
});