"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreditHandler {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
        this.operation = 'credit';
    }
    notify(comand) {
        const account = this.accountRepository.get(comand.accountDocument);
        if (account) {
            account.credit(comand.amount);
        }
    }
}
exports.default = CreditHandler;
