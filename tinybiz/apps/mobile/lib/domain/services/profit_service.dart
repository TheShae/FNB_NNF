import '../models/product.dart';
import '../models/business_event.dart';
import '../models/today_summary.dart';

class ProfitService {
  static TodaySummary calculateTodaySummary(
    List<BusinessEvent> events,
    List<Product> products,
    DateTime date,
  ) {
    double totalSalesRevenue = 0.0;
    double costOfGoodsSold = 0.0;
    double expenses = 0.0;
    double verifiedSalesRevenue = 0.0;

    final Map<String, int> productQuantityMap = {};
    final Map<String, double> productRevenueMap = {};

    for (final event in events) {
      final isSameDay = event.occurredAt.year == date.year &&
          event.occurredAt.month == date.month &&
          event.occurredAt.day == date.day;

      if (!isSameDay) continue;

      if (event.type == 'SALE') {
        final saleAmount = event.amount ?? ((event.unitPrice ?? 0) * (event.quantity ?? 0));
        totalSalesRevenue += saleAmount;

        final costAmount = (event.unitCost ?? 0) * (event.quantity ?? 0);
        costOfGoodsSold += costAmount;

        if (event.verificationTier == 'CUSTOMER_QR' || event.verificationTier == 'FNB_PAYMENT') {
          verifiedSalesRevenue += saleAmount;
        }

        if (event.productId != null) {
          productQuantityMap[event.productId!] =
              (productQuantityMap[event.productId!] ?? 0) + (event.quantity ?? 0);
          productRevenueMap[event.productId!] =
              (productRevenueMap[event.productId!] ?? 0) + saleAmount;
        }
      } else if (event.type == 'EXPENSE') {
        expenses += event.amount ?? 0.0;
      }
    }

    final grossProfit = totalSalesRevenue - costOfGoodsSold;
    final netProfit = grossProfit - expenses;

    final verifiedSalesPercentage = totalSalesRevenue > 0
        ? (verifiedSalesRevenue / totalSalesRevenue) * 100.0
        : 0.0;

    final List<ProductSalesCount> topSellingProducts = [];
    productQuantityMap.forEach((productId, qty) {
      final product = products.firstWhere(
        (p) => p.id == productId,
        orElse: () => Product(
          id: productId,
          merchantId: '',
          name: 'Item',
          emoji: '📦',
          unit: 'unit',
          costPrice: 0,
          sellPrice: 0,
          currentStock: 0,
        ),
      );
      topSellingProducts.add(ProductSalesCount(
        product: product,
        quantitySold: qty,
        revenue: productRevenueMap[productId] ?? 0.0,
      ));
    });

    topSellingProducts.sort((a, b) => b.quantitySold.compareTo(a.quantitySold));

    return TodaySummary(
      totalSalesRevenue: totalSalesRevenue,
      costOfGoodsSold: costOfGoodsSold,
      grossProfit: grossProfit,
      expenses: expenses,
      netProfit: netProfit,
      topSellingProducts: topSellingProducts,
      verifiedSalesPercentage: verifiedSalesPercentage,
    );
  }
}
