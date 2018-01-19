import { assert, expect } from "chai";
import { Guid } from "guid-typescript";
import "mocha";
import { DiscountCoupon, Period } from "../../../../src/shared-kernel/shared-kernel.module";



describe("VO discount coupon", () => {

    const date = new Date();
    date.setDate(date.getDate() + 30);
    const period = new Period(new Date(), date);
    const invalidPeriod = new Period(new Date("11/12/2012"), new Date("11/12/2013"));

    it("Should create a coupon", () => {
        const wrong = new DiscountCoupon("", 10, null);
        expect(wrong.invalid).to.equal(true);

        const right = new DiscountCoupon(Guid.create().toString(), 10, period);
        expect(right.valid).to.equal(true);
        expect(right.expirou).to.equal(false);
    });

    it("shouldn't be expired", () => {
        const wrong = new DiscountCoupon(Guid.create().toString(), 10, invalidPeriod);
        expect(wrong.expirou).to.equal(true);

        const right = new DiscountCoupon(Guid.create().toString(), 10, period);
        expect(right.expirou).to.equal(false);
    });

});