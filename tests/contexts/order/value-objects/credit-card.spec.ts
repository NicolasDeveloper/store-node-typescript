import { assert, expect } from "chai";
import "mocha";
import { CreditCard, DiscountCoupon, Period } from "../../../../src/shared-kernel/shared-kernel.module";


describe("VO credit card", () => {
    
    const validateCredit = (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
    const validNumber = "348515233825320";

    it("Should create a credit card", () => {
        const wrong = new CreditCard("1", 12, "12/2011", "");
        expect(wrong.invalid).to.equal(true);
        expect(wrong.notifications.Count()).to.equal(4);

        const right = new CreditCard("348515233825320", 1234, validateCredit, "Nicolas silva dos Santos");
        expect(right.valid).to.equal(true);
    });

});