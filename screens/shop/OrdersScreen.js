import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0 || !orders) {
    return (
      <View style={styles.noOrders}>
        <Text>You have no orders currently.</Text>
        <Button
          title="Shop Now"
          onPress={() => props.navigation.navigate('Products')}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" colors={Colors.primary} />
      </View>
    );
  } else {
    return (
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <OrderItem
            items={itemData.item.items}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
          >
            {itemData.item.totalAmount}
          </OrderItem>
        )}
      />
    );
  }
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerTitle: 'Your Orders',
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrders: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen;
