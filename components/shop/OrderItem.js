import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailedItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              deletable={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  totalAmount: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: '#888',
  },
  detailedItems: {
    width: '100%',
  },
});

export default OrderItem;
