import { Notifiable } from "fluent-validator-typescript";
import { Guid } from "guid-typescript";

export class Entity extends Notifiable {
    protected _id: Guid;

    constructor() {
        super();
        this._id = Guid.create();
    }

    get id(): Guid {
        return this._id;
    }

    public equals(other: Entity): boolean {

        if (!(other instanceof Entity)) {
            return false;
        }

        return (other._id === this._id);
    }

}