import { Notifiable } from "fluent-validator-typescript";

export abstract class ValueObject<T> extends Notifiable {
    
    public equals(other: any) {
        const _other = other as T;

        if (other !== null) {
            return false;
        }

        this.equalsCore(other);
    }

    protected abstract equalsCore(other: T): boolean;

}