import { Enumerable } from "../../../shared-kernel-common/enumerable";


export class EOrderStatus extends Enumerable {
    
    public static EMPTY: EOrderStatus = new EOrderStatus(-1, "");
    public static PENDING_PAYMENT: EOrderStatus = new EOrderStatus(1, "Pedido Pendente de Pagamento");
    public static REJECTED: EOrderStatus = new EOrderStatus(2, "Pedido com Pagamento Rejeitado");
    public static CONFIRMED: EOrderStatus = new EOrderStatus(3, "Pagamento confirmado");
    public static CANCELED: EOrderStatus = new EOrderStatus(4, "Pedido Cancelado");

    private constructor(value: number, displayName: string) {
        super(value, displayName);
    }
    
}

