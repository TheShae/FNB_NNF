import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../core/config/app_config.dart';
import '../../core/errors/app_exception.dart';

class ApiClient {
  final http.Client client;
  final String baseUrl;

  ApiClient({
    http.Client? client,
    String? baseUrl,
  })  : client = client ?? http.Client(),
        baseUrl = baseUrl ?? AppConfig.apiBaseUrl;

  Future<dynamic> get(String endpoint, {Map<String, String>? headers}) async {
    try {
      final response = await client
          .get(Uri.parse('$baseUrl$endpoint'), headers: _defaultHeaders(headers))
          .timeout(const Duration(seconds: 10));
      return _processResponse(response);
    } catch (e) {
      throw AppException('Network request failed: $e');
    }
  }

  Future<dynamic> post(String endpoint, {dynamic body, Map<String, String>? headers}) async {
    try {
      final response = await client
          .post(
            Uri.parse('$baseUrl$endpoint'),
            headers: _defaultHeaders(headers),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(const Duration(seconds: 10));
      return _processResponse(response);
    } catch (e) {
      throw AppException('Network request failed: $e');
    }
  }

  Map<String, String> _defaultHeaders(Map<String, String>? extraHeaders) {
    final map = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (extraHeaders != null) {
      map.addAll(extraHeaders);
    }
    return map;
  }

  dynamic _processResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return null;
      return jsonDecode(response.body);
    } else {
      throw AppException(
        'Server returned error: ${response.body}',
        statusCode: response.statusCode,
      );
    }
  }
}
