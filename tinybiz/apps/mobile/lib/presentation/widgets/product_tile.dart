import 'package:flutter/material.dart';
import '../../domain/models/product.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';

class ProductTile extends StatelessWidget {
  final Product product;
  final int cartQuantity;
  final VoidCallback onTap;

  const ProductTile({
    super.key,
    required this.product,
    required this.cartQuantity,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final bool isOutOfStock = product.currentStock <= 0;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: isOutOfStock ? null : onTap,
        child: Container(
          padding: const EdgeInsets.all(12),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    product.emoji,
                    style: const TextStyle(fontSize: 32),
                  ),
                  if (cartQuantity > 0)
                    CircleAvatar(
                      radius: 12,
                      backgroundColor: AppTheme.fnbAmber,
                      child: Text(
                        '$cartQuantity',
                        style: const TextStyle(
                          color: Colors.black,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                product.name,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    MoneyFormatter.format(product.sellPrice),
                    style: const TextStyle(
                      color: AppTheme.fnbTurquoise,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    isOutOfStock ? 'OUT' : '${product.currentStock} left',
                    style: TextStyle(
                      color: isOutOfStock ? Colors.redAccent : AppTheme.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
