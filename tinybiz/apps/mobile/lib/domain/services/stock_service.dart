import '../models/product.dart';
import '../models/business_event.dart';

class StockService {
  static Product applySaleToProduct(Product product, int quantitySold) {
    final newStock = (product.currentStock - quantitySold).clamp(0, 99999);
    return product.copyWith(currentStock: newStock);
  }

  static Product applyRestockToProduct(Product product, int quantityAdded) {
    final newStock = product.currentStock + quantityAdded;
    return product.copyWith(currentStock: newStock);
  }

  static int calculateCurrentStockFromEvents(Product product, List<BusinessEvent> events) {
    int stock = product.currentStock;
    for (final event in events) {
      if (event.productId == product.id) {
        if (event.type == 'SALE' && event.quantity != null) {
          stock -= event.quantity!;
        } else if (event.type == 'RESTOCK' && event.quantity != null) {
          stock += event.quantity!;
        }
      }
    }
    return stock.clamp(0, 99999);
  }
}
