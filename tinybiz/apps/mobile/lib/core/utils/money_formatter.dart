import 'package:intl/intl.dart';

class MoneyFormatter {
  static final NumberFormat _currencyFormat = NumberFormat.currency(
    symbol: 'R',
    decimalDigits: 2,
  );

  static String format(double amount) {
    return _currencyFormat.format(amount);
  }
}
