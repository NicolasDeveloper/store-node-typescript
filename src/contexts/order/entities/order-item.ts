import { Notifiable, ValidationContract } from "fluent-validator-typescript";
import { Guid } from "guid-typescript";
import { Order } from "./order";

export class OrderItem extends Notifiable {

    private _id: Guid;
    private _order: Order;
    private _sku: string;
    private _description: string;
    private _price: number;

    constructor(order: Order, sku: string, description: string, price: number) {
        super();

        this._id = Guid.create();
        this._order = order;
        this._sku = sku;
        this._description = description;
        this._price = price;

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .objectIsNotNull(this._order, "order", "a pedido não pode ser nulo!")
            .stringIsNotNullOrEmpty(this._sku, "sku", "a sku não pode ser nula!")
            .isGreaterThan(this._price, 0, "price", "o preço deve ser maior que 0!");

        this.addNotifications(contract.notifications);
    }

    get id(): Guid {
        return this._id;
    }

    get order(): Order {
        return this._order;
    }

    get sku(): string {
        return this._sku;
    }

    get description(): string {
        return this._description;
    }

    get price(): number {
        return this._price;
    }

    public equals(other: OrderItem): boolean {
        
        return (other !== null && 
                other._order.equals(this._order) &&
                other._sku === this._sku);
    }
}