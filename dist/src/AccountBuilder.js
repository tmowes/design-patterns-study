"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-cycle
const Account_1 = __importDefault(require("./Account"));
class AccountBuilder {
    constructor(document) {
        this.document = document;
    }
    setBank(bank) {
        this.bank = bank;
        return this;
    }
    setBranch(branch) {
        this.branch = branch;
        return this;
    }
    setAccount(account) {
        this.account = account;
        return this;
    }
    build() {
        return new Account_1.default(this);
    }
}
exports.default = AccountBuilder;
