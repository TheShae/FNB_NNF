import 'api_client.dart';
import '../../domain/models/product.dart';

class ProductApi {
  final ApiClient apiClient;

  ProductApi(this.apiClient);

  Future<List<Product>> fetchProducts(String merchantId) async {
    final res = await apiClient.get('/products?merchantId=$merchantId');
    if (res is List) {
      return res.map((item) => Product.fromJson(item)).toList();
    }
    return [];
  }
}
