import { assert, expect } from "chai";
import "mocha";
import { Period } from "../../../../src/shared-kernel/shared-kernel.module";

describe("VO period", () => {

    it("Should create a period", () => {
        let wrong = new Period(new Date(), new Date());
        expect(wrong.invalid).to.equal(true);

        wrong = new Period(null, null);
        expect(wrong.invalid).to.equal(true);
        expect(wrong.notifications.Count()).to.equal(3);

        const date = new Date();
        date.setDate(date.getDate() + 30); 
        const right = new Period(new Date(), date);
    });

});