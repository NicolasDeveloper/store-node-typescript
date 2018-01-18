export abstract class Enumerable {


    private _value: number;
    private _displayName: string;

    constructor(value: number, displayName: string) {
        this._value = value;
        this._displayName = displayName;
    }

    get value(): number {
        return this._value;
    }

    get displayName(): string {
        return this._displayName;
    }

    public toString(): string {
        return this._displayName;
    }

    public equals(other: Enumerable) {
        if (!(other instanceof Enumerable)) {
            return false;
        }
        return (this._value === other.value);
    }

}