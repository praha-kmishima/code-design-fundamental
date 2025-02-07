class Purchase {
    private _userId: string
    private _productId: string
    constructor(userId: string, productId: string) {
        this._userId = userId
        this._productId = productId
    }
  
    // 新人「こうやってgetter/setterを定義してあげればデメトルの法則には違反しませんよね！」
    public get userId() {
        return this._userId
    }
    public set userId(id) {
        this._userId = id
    }
    public get productId() {
        return this._productId
    }
    public set productId(id) {
        this._productId = id
    }
  }