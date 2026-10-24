import '../models/business_event.dart';
import '../models/restock_offer.dart';
import '../../core/utils/id_generator.dart';

class RepaymentResult {
  final RestockOffer updatedOffer;
  final BusinessEvent? repaymentEvent;

  RepaymentResult({
    required this.updatedOffer,
    this.repaymentEvent,
  });
}

class RepaymentService {
  static RepaymentResult processRepaymentForSale({
    required RestockOffer activeOffer,
    required BusinessEvent saleEvent,
    required String deviceId,
  }) {
    if (activeOffer.status != 'ACCEPTED' && activeOffer.status != 'ACTIVE') {
      return RepaymentResult(updatedOffer: activeOffer);
    }

    final saleAmount = saleEvent.amount ?? ((saleEvent.unitPrice ?? 0) * (saleEvent.quantity ?? 0));
    if (saleAmount <= 0) {
      return RepaymentResult(updatedOffer: activeOffer);
    }

    final double deduction = saleAmount * activeOffer.repaymentPercent;
    final double newOutstanding = (activeOffer.outstandingAmount - deduction).clamp(0.0, activeOffer.amount);
    final String newStatus = newOutstanding <= 0 ? 'REPAID' : 'ACTIVE';

    final repaymentEvent = BusinessEvent(
      id: IdGenerator.newId(),
      merchantId: activeOffer.merchantId,
      type: 'LOAN_REPAYMENT',
      amount: deduction,
      verificationTier: saleEvent.verificationTier,
      verificationWeight: saleEvent.verificationWeight,
      occurredAt: saleEvent.occurredAt,
      createdAt: DateTime.now(),
      deviceId: deviceId,
      syncStatus: 'PENDING',
      metadata: {
        'offerId': activeOffer.id,
        'sourceSaleEventId': saleEvent.id,
      },
    );

    final updatedOffer = activeOffer.copyWith(
      outstandingAmount: newOutstanding,
      status: newStatus,
    );

    return RepaymentResult(
      updatedOffer: updatedOffer,
      repaymentEvent: repaymentEvent,
    );
  }
}
