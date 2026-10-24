import 'product.dart';

class StockPrediction {
  final Product product;
  final int unitsSoldLast7Days;
  final double averageDailyUnitsSold;
  final double daysLeft;
  final String statusMessage;
  final bool isLowStock;

  const StockPrediction({
    required this.product,
    required this.unitsSoldLast7Days,
    required this.averageDailyUnitsSold,
    required this.daysLeft,
    required this.statusMessage,
    required this.isLowStock,
  });
}
