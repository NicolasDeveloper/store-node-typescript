import { assert, expect } from "chai";
import { Guid } from "guid-typescript";
import { List } from "linqts";
import "mocha";
import { Cart, CartItem } from "../../../../src/contexts/shopping-cart/shopping-cart.module";


describe("Cart Item", () => {
    const cart = new Cart(Guid.create());
    
    it("Should create a item", () => {
        const wrong = new CartItem(cart, "", 0, "");

        expect(wrong.notifications.Count()).to.equal(3);
        expect(wrong.invalid).to.equal(true);

        const right = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        expect(right.valid).to.equal(true);
    });

    it("Should be equals", () => {
        const wrong1: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");
        const wrong2: CartItem = new CartItem(cart, Guid.create().toString(), 100, "mouse gamer");

        expect(wrong1.equals(wrong2)).to.equal(false);

        const skuId = Guid.create().toString();
        const right1 = new CartItem(cart, skuId, 100, "mouse gamer");
        const right2 = new CartItem(cart, skuId, 100, "mouse gamer");

        expect(right1.equals(right2)).to.equal(true);
    });
    
});