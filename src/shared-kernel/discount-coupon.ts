import { ValidationContract } from "fluent-validator-typescript";
import { ValueObject } from "../shared-kernel-common/value-object";
import { Period } from "./period";

export class DiscountCoupon extends ValueObject<DiscountCoupon> {

    private _code: string;
    private _validate: Period;
    private _appliedPercentage: number;

    constructor(code: string, appliedPercentage: number, validate: Period) {
        super();

        this._code = code;
        this._validate = validate;
        this._appliedPercentage = appliedPercentage || 0;

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .stringIsNotNullOrEmpty(this._code, "code", "o código é obrigatório!")
            .objectIsNotNull(this._validate, "validate", "a validade é obrigatória!");

        this.addNotifications(contract.notifications);
    }

    get expirou(): boolean {
        const now = new Date();
        return !(now >= this._validate.initial && now <= this._validate.final);
    }

    get appliedPercentage(): number {
        return this._appliedPercentage;
    }

    public equalsCore(other: DiscountCoupon): boolean {

        if (!(other instanceof DiscountCoupon)) {
            return false;
        }

        return true;
    }

}