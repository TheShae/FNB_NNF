import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/models/product.dart';
import '../../domain/models/cart_item.dart';

class CartNotifier extends StateNotifier<List<CartItem>> {
  CartNotifier() : super([]);

  void addProduct(Product product) {
    final index = state.indexWhere((item) => item.product.id == product.id);
    if (index >= 0) {
      final currentQty = state[index].quantity;
      if (currentQty < product.currentStock) {
        final updated = List<CartItem>.from(state);
        updated[index] = state[index].copyWith(quantity: currentQty + 1);
        state = updated;
      }
    } else {
      if (product.currentStock > 0) {
        state = [...state, CartItem(product: product, quantity: 1)];
      }
    }
  }

  void removeProduct(Product product) {
    final index = state.indexWhere((item) => item.product.id == product.id);
    if (index >= 0) {
      final currentQty = state[index].quantity;
      if (currentQty > 1) {
        final updated = List<CartItem>.from(state);
        updated[index] = state[index].copyWith(quantity: currentQty - 1);
        state = updated;
      } else {
        state = state.where((item) => item.product.id != product.id).toList();
      }
    }
  }

  void clear() {
    state = [];
  }

  double get totalAmount => state.fold(0.0, (sum, item) => sum + item.itemTotal);
  int get totalItems => state.fold(0, (sum, item) => sum + item.quantity);
}

final cartProvider = StateNotifierProvider<CartNotifier, List<CartItem>>((ref) {
  return CartNotifier();
});
