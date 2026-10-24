import 'product.dart';

class TodaySummary {
  final double totalSalesRevenue;
  final double costOfGoodsSold;
  final double grossProfit;
  final double expenses;
  final double netProfit;
  final List<ProductSalesCount> topSellingProducts;
  final double verifiedSalesPercentage;

  const TodaySummary({
    required this.totalSalesRevenue,
    required this.costOfGoodsSold,
    required this.grossProfit,
    required this.expenses,
    required this.netProfit,
    required this.topSellingProducts,
    required this.verifiedSalesPercentage,
  });
}

class ProductSalesCount {
  final Product product;
  final int quantitySold;
  final double revenue;

  const ProductSalesCount({
    required this.product,
    required this.quantitySold,
    required this.revenue,
  });
}
