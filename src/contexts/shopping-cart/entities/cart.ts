import { Notifiable, ValidationContract } from "fluent-validator-typescript";
import { Guid } from "guid-typescript";
import { List } from "linqts";
import { Agregate } from "../../../shared-kernel-common/agregate";
import { CartItem } from "./cart-item";


export class Cart extends Agregate {

    /*
     * Propeties
     */
    private _clientId: Guid;
    private _items: List<CartItem>;
    private _total: number;
    private _discountCouponCode: string;
    private _creatAt: Date;

    constructor(clientId: Guid) {
        super();
        this._clientId = clientId;
        this._items = new List<CartItem>();
        this._creatAt = new Date();

        const contract: ValidationContract = new ValidationContract()
            .guidIsNotNullOrEmpty(clientId, "clientId", "id do client inválido!");

        this.addNotifications(contract.notifications);
    }

    get clientId(): Guid {
        return this._clientId;
    }

    get items(): List<CartItem> {
        return this._items;
    }

    get total(): number {
        return this._items.Sum((x) => x.price);
    }

    /*
     * Actions
     */
    public addItem(item: CartItem): void {
        this._items.Add(item);
    }

    public addItems(items: List<CartItem>): void {
        this._items.AddRange(items.ToArray());
    }

    public removeItem(item: CartItem): void {
        const itemRemove: CartItem = this.items.First((x) => x.equals(item));

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .objectIsNotNull(itemRemove, "cartItem", "sku não encontrado!");

        if (this.valid) {
            this._items.Remove(itemRemove);
        }
    }

    public removeItemById(itemId: Guid): void {
        const item: CartItem = this._items.First((x) => x.id === itemId);
        this._items.Remove(item);
    }

    public applyDiscountCoupon(discountCouponCode: string): void {
        const contract = new ValidationContract()
            .requires()
            .stringIsNotNullOrEmpty(discountCouponCode, "discount coupon", "cupom inválido!");

        this.addNotifications(contract.notifications);

        if (this.valid) {
            this._discountCouponCode = discountCouponCode;
        }
    }
}