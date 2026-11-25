import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingBag, Compass, Heart, User } from 'lucide-react-native';
import { useStore } from '../types/store';

export const BottomNav = ({
  active,
  navigation,
}: {
  active: 'Shop' | 'Explore' | 'Cart' | 'Favourite' | 'Account';
  navigation: any;
}) => {
  const { cart } = useStore();
  const cartCount = Object.values(cart).reduce((sum, e) => sum + e.qty, 0);

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <ShoppingBag
          size={21}
          color={active === 'Shop' ? '#53B175' : '#181725'}
        />
        <Text style={[styles.navText, active === 'Shop' && styles.navTextActive]}>
          Дүкен
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Explore')}
      >
        <Compass
          size={21}
          color={active === 'Explore' ? '#53B175' : '#181725'}
        />
        <Text
          style={[styles.navText, active === 'Explore' && styles.navTextActive]}
        >
          Шолу
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Cart')}
      >
        <View style={styles.cartIconWrap}>
          <ShoppingBag
            size={21}
            color={active === 'Cart' ? '#53B175' : '#181725'}
          />
          {cartCount > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navText, active === 'Cart' && styles.navTextActive]}>
          Себет
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Heart
          size={21}
          color={active === 'Favourite' ? '#53B175' : '#181725'}
        />
        <Text
          style={[
            styles.navText,
            active === 'Favourite' && styles.navTextActive,
          ]}
        >
          Таңдаулы
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Account')}
      >
        <User
          size={21}
          color={active === 'Account' ? '#53B175' : '#181725'}
        />
        <Text
          style={[
            styles.navText,
            active === 'Account' && styles.navTextActive,
          ]}
        >
          Аккаунт
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { alignItems: 'center', justifyContent: 'center', gap: 3 },
  navText: { fontSize: 11, fontWeight: '600', color: '#181725' },
  navTextActive: { color: '#53B175' },
  cartIconWrap: { position: 'relative' },
  navBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#53B175',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  navBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
});