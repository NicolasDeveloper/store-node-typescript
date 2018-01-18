import { assert, expect } from "chai";
import { Guid } from "guid-typescript";
import { List } from "linqts";
import "mocha";
import { Cart, CartItem } from "../../../../src/contexts/shopping-cart/shopping-cart.module";


describe("Cart", () => {

    it("Should has 2 items in cart", () => {
        const cart: Cart = new Cart(Guid.create());
        const items = new List<CartItem>();

        const mouse1: CartItem = new CartItem(cart, Guid.create().toString(), 151.50, "mouse");
        const mouse2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        items.Add(mouse1);
        items.Add(mouse2);

        cart.addItems(items);

        expect(cart.items.Count()).to.equal(2);
    });

    it("Should has discount coupon", () => {
        const wrong: Cart = new Cart(Guid.create());
        wrong.applyDiscountCoupon(null);
        wrong.applyDiscountCoupon("");

        expect(wrong.notifications.Count()).to.equal(2);
        expect(wrong.invalid).to.equal(true);

        const right: Cart = new Cart(Guid.create());
        right.applyDiscountCoupon(Guid.create().toString());

        expect(right.valid).to.equal(true);
    });

    it("Should has 2 items with the total 251.50 R$", () => {
        const cart: Cart = new Cart(Guid.create());
        const items = new List<CartItem>();

        const mouse1: CartItem = new CartItem(cart, Guid.create().toString(), 151.50, "mouse");
        const mouse2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        items.Add(mouse1);
        items.Add(mouse2);

        cart.addItems(items);

        expect(cart.total).to.equal(251.50);
    });

    it("Should has 1 item -- remove by reference", () => {
        const cart: Cart = new Cart(Guid.create());
        const items = new List<CartItem>();

        const mouse1: CartItem = new CartItem(cart, Guid.create().toString(), 151.50, "mouse");
        const mouse2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        items.Add(mouse1);
        items.Add(mouse2);

        cart.addItems(items);

        cart.removeItem(mouse1);

        expect(cart.items.Count()).to.equal(1);
    });

    it("Should has 1 item -- remove by id", () => {
        const cart: Cart = new Cart(Guid.create());
        const items = new List<CartItem>();

        const mouse1: CartItem = new CartItem(cart, Guid.create().toString(), 151.50, "mouse");
        const mouse2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        items.Add(mouse1);
        items.Add(mouse2);

        cart.addItems(items);

        cart.removeItemById(mouse1.id);

        expect(cart.items.Count()).to.equal(1);
    });

    it("There should be client id in the cart", () => {
        let wrong: Cart = new Cart(Guid.createEmpty());
        expect(wrong.invalid).to.equal(true);

        wrong = new Cart(null);
        expect(wrong.invalid).to.equal(true);

        const right: Cart = new Cart(Guid.create());
        expect(right.valid).to.equal(true);
    });

});