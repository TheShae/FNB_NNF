import 'package:uuid/uuid.dart';

class IdGenerator {
  static const Uuid _uuid = Uuid();

  static String newId() {
    return _uuid.v4();
  }
}
