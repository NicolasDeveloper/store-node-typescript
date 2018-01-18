import { ValidationContract } from "fluent-validator-typescript";
import { ValueObject } from "../shared-kernel-common/value-object";

export class Period extends ValueObject<Period> {
    
    public static monthly(): Period {
        const final: Date = new Date();
        final.setDate(final.getDate() + 30);

        return new Period(new Date(), final);
    }

    public static biweekly(): Period {
        const final: Date = new Date();
        final.setDate(final.getDate() + 15);

        return new Period(new Date(), final);
    }

    private _initial: Date;
    private _final: Date;
    

    constructor(initial: Date, final: Date) {
        super();

        this._initial = initial;
        this._final = initial;

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .objectIsNotNull(this._initial, "initial period", "o período inicial é obrigatório!")
            .objectIsNotNull(this._final, "final period", "o período final é obrigatório!")
            .isTrue(this._initial > this._final, "period", "o período inicial não pode ser maior que o período final!");

        this.addNotifications(contract.notifications);
    }

    protected equalsCore(other: Period): boolean {
        return this._initial === other.initial &&
            this._final === other.final;
    }

    get initial() {
        return this._initial;
    }

    get final() {
        return this._final;
    }
}