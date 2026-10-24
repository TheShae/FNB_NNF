import '../models/business_event.dart';

class VerificationService {
  static BusinessEvent verifyWithCustomerQr(BusinessEvent event) {
    return event.copyWith(
      verificationTier: 'CUSTOMER_QR',
      verificationWeight: 2,
      syncStatus: event.syncStatus == 'SYNCED' ? 'PENDING' : event.syncStatus,
    );
  }

  static BusinessEvent verifyWithFnbPayment(BusinessEvent event) {
    return event.copyWith(
      verificationTier: 'FNB_PAYMENT',
      verificationWeight: 3,
      syncStatus: event.syncStatus == 'SYNCED' ? 'PENDING' : event.syncStatus,
    );
  }
}
