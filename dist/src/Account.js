"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
class Account {
    constructor(accountBuilder) {
        this.bank = accountBuilder.bank;
        this.branch = accountBuilder.branch;
        this.account = accountBuilder.account;
        this.document = accountBuilder.document;
        this.transactions = [];
    }
    credit(amount) {
        this.transactions.push(new Transaction_1.default('credit', amount));
    }
    debit(amount) {
        this.transactions.push(new Transaction_1.default('debit', amount));
    }
    getBalance() {
        return this.transactions.reduce((acc, transaction) => transaction.type === 'credit' ? acc + transaction.amount : acc - transaction.amount, 0);
    }
}
exports.default = Account;
