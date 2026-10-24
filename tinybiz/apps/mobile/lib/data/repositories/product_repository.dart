import 'package:drift/drift.dart';
import '../local/database/app_database.dart';
import '../../domain/models/product.dart';

class ProductRepository {
  final AppDatabase db;

  ProductRepository(this.db);

  Stream<List<Product>> watchAllProducts() {
    return db.select(db.productsTable).watch().map((rows) {
      return rows
          .map((row) => Product(
                id: row.id,
                merchantId: row.merchantId,
                name: row.name,
                emoji: row.emoji,
                unit: row.unit,
                costPrice: row.costPrice,
                sellPrice: row.sellPrice,
                currentStock: row.currentStock,
                lowStockThreshold: row.lowStockThreshold,
              ))
          .toList();
    });
  }

  Future<void> saveProduct(Product product) async {
    await db.into(db.productsTable).insertOnConflictUpdate(
          ProductsTableCompanion.insert(
            id: product.id,
            merchantId: product.merchantId,
            name: product.name,
            emoji: Value(product.emoji),
            unit: Value(product.unit),
            costPrice: product.costPrice,
            sellPrice: product.sellPrice,
            currentStock: Value(product.currentStock),
            lowStockThreshold: Value(product.lowStockThreshold),
          ),
        );
  }

  Future<void> updateProductStock(String productId, int newStock) async {
    await (db.update(db.productsTable)..where((tbl) => tbl.id.equals(productId)))
        .write(ProductsTableCompanion(currentStock: Value(newStock)));
  }

  Future<void> saveAllProducts(List<Product> products) async {
    for (final p in products) {
      await saveProduct(p);
    }
  }
}
