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

// バリデーション結果のインターフェース
interface ValidationResult {
  isValid: boolean;
  error?: Error;
}

// カスタムエラー
class YearlyPurchaseLimitValidationError extends Error {
  constructor(productId: string) {
    super(`この商品（${productId}）は過去1年以内に購入済みです。おひとりさま一品限定となっております。`);
    this.name = 'PurchaseLimitError';
  }
}

// バリデータークラス
class PurchaseValidator {
  validate(userId: string, productId: string, purchases: Purchase[]): ValidationResult {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const pastPurchase = purchases.find(p => 
      p.productId === productId && 
      p.transaction.succeeded &&
      p.transaction.completedAt >= oneYearAgo
    );
    
    if (pastPurchase) {
      return {
        isValid: false,
        error: new YearlyPurchaseLimitValidationError(productId)
      };
    }

    return { isValid: true };
  }
}

class ValidatorBasedPurchaseService {
  private validator: PurchaseValidator;

  public constructor(private paymentRecordRepo: PaymentRecordRepo) {
    this.validator = new PurchaseValidator();
  }

  public purchase(userId: string, productId: string) {
    const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId);
    
    const validationResult = this.validator.validate(userId, productId, allPurchases);
    if (!validationResult.isValid && validationResult.error) {
      throw new YearlyPurchaseLimitValidationError(productId);
    }

    // 購入手続きに進む
  }
}
