import { formatCurrency } from "../scripts/utils/money.js";

describe("test suite: Format Currency", () =>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('2095')
    })
})