import { ValidationContract } from "fluent-validator-typescript";
import { ValueObject } from "../shared-kernel-common/value-object";

export class CreditCard extends ValueObject<CreditCard> {

    private _cardNumber: string;
    private _securityCode: number;
    private _validate: string;
    private _printedName: string;

    constructor(cardNumber: string, securityCode: number, validate: string, printedName: string) {
        super();

        this._cardNumber = cardNumber;
        this._securityCode = securityCode;
        this._validate = validate;
        this._printedName = printedName;

        const contract: ValidationContract = new ValidationContract()
            .requires()
            .stringIsNotNullOrEmpty(this._cardNumber, "card number", "o numero do cartão é obrigatório!")
            .hasMinLen(this._securityCode.toString(), 4, "security code", "o código de segurança está inválido!")
            .hasMaxLen(this._securityCode.toString(), 4, "security code", "o código de segurança está inválido!")
            .stringIsNotNullOrEmpty(this._validate, "validate", "a validade é obrigatória!")
            .stringIsNotNullOrEmpty(this._printedName, "printedName", "o nome impresso no cartão é obrigatório!")
            .creditCardDateIsValid(this._validate, "validate", "a data está no formato inválido! formato: mm/yyyy")
            .creditCardDateIsGreaterThanToday(this._validate, "validate", "a validade está expirada!")
            .creditCardNumberIsValid(this._cardNumber, "number", "o numero do cartão está inválido!");

        this.addNotifications(contract.notifications);
    }

    get cardNumber(): string {
        return this._cardNumber;
    }

    get securityCode(): number {
        return this._securityCode;
    }

    get validate(): string {
        return this._validate;
    }

    get printedName(): string {
        return this._printedName;
    }

    protected equalsCore(other: CreditCard): boolean {
        return (this._cardNumber === other.cardNumber &&
            this._securityCode === other.securityCode &&
            this._validate === other.validate &&
            this._printedName === other.printedName);
    }
}