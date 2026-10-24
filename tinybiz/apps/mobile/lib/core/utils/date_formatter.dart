import 'package:intl/intl.dart';

class DateFormatter {
  static String formatDateTime(DateTime dateTime) {
    return DateFormat('dd MMM yyyy, HH:mm').format(dateTime);
  }

  static String formatDateShort(DateTime dateTime) {
    return DateFormat('dd MMM').format(dateTime);
  }

  static String formatDayOfWeek(DateTime dateTime) {
    return DateFormat('EEE').format(dateTime);
  }
}
