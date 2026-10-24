import '../models/cart_item.dart';
import '../models/business_event.dart';
import '../../core/utils/id_generator.dart';

class SalesService {
  static List<BusinessEvent> createSaleEventsFromCart({
    required List<CartItem> cart,
    required String merchantId,
    required String deviceId,
    required DateTime occurredAt,
  }) {
    final List<BusinessEvent> events = [];
    final now = DateTime.now();

    for (final item in cart) {
      events.add(
        BusinessEvent(
          id: IdGenerator.newId(),
          merchantId: merchantId,
          productId: item.product.id,
          type: 'SALE',
          quantity: item.quantity,
          unitPrice: item.product.sellPrice,
          unitCost: item.product.costPrice,
          amount: item.itemTotal,
          verificationTier: 'SELF',
          verificationWeight: 1,
          occurredAt: occurredAt,
          createdAt: now,
          deviceId: deviceId,
          syncStatus: 'PENDING',
        ),
      );
    }
    return events;
  }
}
