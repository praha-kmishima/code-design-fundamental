interface Purchase {
  userId: string
  productId: string
  transaction: {
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[]
}

// 基本となるSpecificationインターフェース
interface PurchaseSpecification {
  isSatisfiedBy(purchase: Purchase, existingPurchases: Purchase[]): boolean;
}

// 1年以内の購入制限のSpecification
class YearlyPurchaseLimitSpecification implements PurchaseSpecification {
  isSatisfiedBy(purchase: Purchase, existingPurchases: Purchase[]): boolean {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return !existingPurchases.some(p => 
      p.productId === purchase.productId && 
      p.transaction.succeeded &&
      p.transaction.completedAt >= oneYearAgo
    );
  }
}

// カスタムエラー
class PurchaseLimitError extends Error {
  constructor(productId: string) {
    super(`この商品（${productId}）は過去1年以内に購入済みです。おひとりさま一品限定となっております。`);
    this.name = 'PurchaseLimitError';
  }
}

class PurchaseService {
  private purchaseSpecification: PurchaseSpecification;

  public constructor(private paymentRecordRepo: PaymentRecordRepo) {
    this.purchaseSpecification = new YearlyPurchaseLimitSpecification();
  }

  public purchase(userId: string, productId: string) {
    const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId);
    const newPurchase: Purchase = {
      userId,
      productId,
      transaction: {
        succeeded: true,
        completedAt: new Date()
      }
    };

    if (!this.purchaseSpecification.isSatisfiedBy(newPurchase, allPurchases)) {
      throw new PurchaseLimitError(productId);
    }

    // 購入手続きに進む
  }
}
