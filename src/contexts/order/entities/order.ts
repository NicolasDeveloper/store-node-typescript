import { ValidationContract } from "fluent-validator-typescript";
import { Guid } from "guid-typescript";
import { List } from "linqts";
import { Agregate } from "../../../shared-kernel-common/agregate";
import { Entity } from "../../../shared-kernel-common/entity";
import { CreditCard } from "../../../shared-kernel/credict-card";
import { DiscountCoupon } from "../../../shared-kernel/discount-coupon";
import { Cart } from "../../shopping-cart/shopping-cart.module";
import { EOrderStatus } from "./eorder-status";
import { OrderItem } from "./order-item";

export class Order extends Agregate {

    // tslint:disable-next-line:max-classes-per-file
    public static factory = class {

        public static create(clientId: Guid, cart: Cart, creditCard: CreditCard): Order {

            const order = new Order(clientId, (cart) ? cart.id : Guid.createEmpty(), creditCard);

            if (cart) {
                order.registerItems(cart.items.Select((x) => new OrderItem(order, x.sku, x.description, x.price)));
            }

            return order;
        }

    };

    private _clientId: Guid;
    private _cartId: Guid;
    private _orderCode: Guid;
    private _status: EOrderStatus;
    private _creditCard: CreditCard;
    private _coupon: DiscountCoupon;
    private _createdAt: Date;
    private _items: List<OrderItem>;
    private _totalWithDiscount: number;
    private _total: number;

    private constructor(clientId: Guid, cartId: Guid, creditCard: CreditCard) {
        super();

        this._clientId = clientId;
        this._cartId = cartId;
        this._orderCode = Guid.create();
        this._status = EOrderStatus.PENDING_PAYMENT;
        this._creditCard = creditCard;
        this._createdAt = new Date();
        this._items = new List<OrderItem>();

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .guidIsNotNullOrEmpty(this._clientId, "client id", "o id do cliente é obirgatório!")
            .guidIsNotNullOrEmpty(this._cartId, "cart id", "o id do carrinho é obirgatório!")
            .objectIsNotNull(this._creditCard, "credit card", "o cartão de crédito é obrigatório!");

        this.addNotifications(contract.notifications);
    }

    get clientId(): Guid {
        return this._clientId;
    }

    get totalWithDiscount(): number {
        return this._totalWithDiscount;
    }

    get total(): number {
        this._total = this._items.Sum((x) => x.price);
        return this._total;
    }

    get cartId(): Guid {
        return this._cartId;
    }

    get orderCode(): Guid {
        return this._orderCode;
    }

    get status(): EOrderStatus {
        return this._status;
    }

    get creditCard(): CreditCard {
        return this._creditCard;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get items(): List<OrderItem> {
        return this._items;
    }

    get coupon(): DiscountCoupon {
        return this._coupon;
    }

    public recalculateOrder(coupon: DiscountCoupon): Order {

        const contract = new ValidationContract()
            .requires()
            .objectIsNotNull(coupon, "coupon", "o cupom é obrigatório!");

        this.addNotifications(contract.notifications);

        if (this.valid) {
            this._coupon = coupon;
            this._totalWithDiscount = this._total - (this._total * (coupon.appliedPercentage / 100));
        }

        return this;        
    }

    public registerItems(items: List<OrderItem>): void {
        this._items.AddRange(items.ToArray());
    }

    public confirmed(): void {
        this._status = EOrderStatus.CONFIRMED;
    }

    public canceled(): void {
        this._status = EOrderStatus.CANCELED;
    }

    public rejected(): void {
        this._status = EOrderStatus.REJECTED;
    }
}