import { assert, expect } from "chai";
import { Guid } from "guid-typescript";
import { List } from "linqts";
import "mocha";
import { EOrderStatus, Order, OrderItem } from "../../../../src/contexts/order/order.module";
import { Cart, CartItem } from "../../../../src/contexts/shopping-cart/shopping-cart.module";
import { CreditCard, DiscountCoupon, Period } from "../../../../src/shared-kernel/shared-kernel.module";


describe("Order", () => {
    const clientId = Guid.create();
    const cart: Cart = new Cart(clientId);
    const items = new List<CartItem>();

    const mouse1: CartItem = new CartItem(cart, Guid.create().toString(), 151.50, "mouse");
    const mouse2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

    items.Add(mouse1);
    items.Add(mouse2);

    cart.addItems(items);

    const validateCredit = (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    const creditCard: CreditCard = new CreditCard("123456", 1234, validateCredit, "Nicolas Silva dos Santos");
    const discountCoupon: DiscountCoupon = new DiscountCoupon(Guid.create().toString(), 10, Period.monthly());

    it("Should create a order", () => {

        const wrongOrder: Order = Order.factory.create(Guid.createEmpty(), null, null);

        expect(wrongOrder.invalid).to.equal(true);
        expect(wrongOrder.notifications.Count()).to.equal(3);

        const rightOrder: Order = Order.factory.create(clientId, cart, creditCard);
        expect(rightOrder.valid).to.equal(true);

    });

    it("Should create a order with status: 'PENDING PAYMENT'", () => {
        
        const wrongOrder: Order = Order.factory.create(clientId, cart, creditCard);
        wrongOrder.canceled();

        expect(wrongOrder.status.equals(EOrderStatus.PENDING_PAYMENT)).to.equal(false);

        const rightOrder: Order = Order.factory.create(clientId, cart, creditCard);
        expect(wrongOrder.status.equals(EOrderStatus.PENDING_PAYMENT)).to.equal(false);

    });

    it("Should create a order with status: 'CANCELED'", () => {

        const wrongOrder: Order = Order.factory.create(clientId, cart, creditCard);
        expect(wrongOrder.status.equals(EOrderStatus.CANCELED)).to.equal(false);

        const rightOrder: Order = Order.factory.create(clientId, cart, creditCard);
        rightOrder.canceled();
        expect(wrongOrder.status.equals(EOrderStatus.CANCELED)).to.equal(false);

    });


    it("Should create a order with status: 'REJECTED'", () => {
        
        const wrongOrder: Order = Order.factory.create(clientId, cart, creditCard);
        expect(wrongOrder.status.equals(EOrderStatus.REJECTED)).to.equal(false);

        const rightOrder: Order = Order.factory.create(clientId, cart, creditCard);
        rightOrder.canceled();
        expect(wrongOrder.status.equals(EOrderStatus.REJECTED)).to.equal(false);

    });

    it("Should create a order with status: 'CONFIRMED'", () => {
        
        const wrongOrder: Order = Order.factory.create(clientId, cart, creditCard);
        expect(wrongOrder.status.equals(EOrderStatus.CONFIRMED)).to.equal(false);

        const rightOrder: Order = Order.factory.create(clientId, cart, creditCard);
        rightOrder.canceled();
        expect(wrongOrder.status.equals(EOrderStatus.CONFIRMED)).to.equal(false);

    });

    it("Should create a order and apply 10% of the discount", () => {
        
        const order: Order = Order.factory.create(clientId, cart, creditCard);
        expect(order.totalWithDiscount).to.equal(0);
        expect(order.total).to.equal(251.50);

        order.recalculateOrder(discountCoupon);

        expect(order.totalWithDiscount).to.equal(226.35);

    });

});