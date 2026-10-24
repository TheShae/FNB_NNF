import '../models/product.dart';
import '../models/business_event.dart';
import '../models/stock_prediction.dart';

class PredictionService {
  static StockPrediction predictProductStockOut(Product product, List<BusinessEvent> events, DateTime now) {
    final sevenDaysAgo = now.subtract(const Duration(days: 7));
    int unitsSoldLast7Days = 0;

    for (final event in events) {
      if (event.productId == product.id && event.type == 'SALE' && event.quantity != null) {
        if (event.occurredAt.isAfter(sevenDaysAgo)) {
          unitsSoldLast7Days += event.quantity!;
        }
      }
    }

    final double averageDailyUnitsSold = unitsSoldLast7Days / 7.0;
    final double daysLeft = averageDailyUnitsSold > 0
        ? (product.currentStock / averageDailyUnitsSold)
        : 999.0;

    String statusMessage;
    bool isLowStock;

    if (daysLeft <= 0.5) {
      statusMessage = '${product.name} likely gone today';
      isLowStock = true;
    } else if (daysLeft <= 3.0) {
      final outDay = _getDayName(now.add(Duration(days: daysLeft.ceil())));
      statusMessage = '${product.name} gone by $outDay';
      isLowStock = true;
    } else if (product.currentStock <= product.lowStockThreshold) {
      statusMessage = '${product.name} is low stock';
      isLowStock = true;
    } else {
      statusMessage = 'Stock is healthy';
      isLowStock = false;
    }

    return StockPrediction(
      product: product,
      unitsSoldLast7Days: unitsSoldLast7Days,
      averageDailyUnitsSold: averageDailyUnitsSold,
      daysLeft: daysLeft,
      statusMessage: statusMessage,
      isLowStock: isLowStock,
    );
  }

  static String _getDayName(DateTime dateTime) {
    switch (dateTime.weekday) {
      case DateTime.monday: return 'Monday';
      case DateTime.tuesday: return 'Tuesday';
      case DateTime.wednesday: return 'Wednesday';
      case DateTime.thursday: return 'Thursday';
      case DateTime.friday: return 'Friday';
      case DateTime.saturday: return 'Saturday';
      case DateTime.sunday: return 'Sunday';
      default: return 'Thursday';
    }
  }
}
