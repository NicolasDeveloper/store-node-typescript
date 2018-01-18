import { Notifiable, ValidationContract } from "fluent-validator-typescript";
import { read } from "fs";
import { Guid } from "guid-typescript";
import { Agregate } from "../../../shared-kernel-common/agregate";
import { Cart } from "../shopping-cart.module";

export class CartItem extends Notifiable {

    private _id: Guid;
    private _cart: Cart;
    private _sku: string;
    private _price: number;
    private _description: string;

    constructor(cart: Cart, sku: string, price: number, description: string) {
        super();

        this._id = Guid.create();
        this._sku = sku;
        this._price = price;
        this._description = description;
        this._cart = cart;

        this.Validate();
    }

    get cart(): Cart {
        return this._cart;
    }

    get id(): Guid {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }

    get sku(): string {
        return this._sku;
    }

    public equals(other: CartItem): boolean {

        if (!(other instanceof CartItem)) {
            return false;
        }

        return (this._sku === other.sku &&
                this._cart.equals(other.cart));
    }

    private Validate(): void {
        const contract: ValidationContract = new ValidationContract()
            .requires()
            .stringIsNotNullOrEmpty(this._sku, "sku", "informe uma sku!")
            .stringIsNotNullOrEmpty(this._description, "description", "informe a descrição do produto!")
            .isGreaterThan(this._price, 1.00, "price", "o preço deve ser maior que 1.00");

        this.addNotifications(contract.notifications);
    }
}