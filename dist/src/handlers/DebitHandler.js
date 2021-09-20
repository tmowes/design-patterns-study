"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DebitHandler {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
        this.operation = 'debit';
    }
    notify(comand) {
        const account = this.accountRepository.get(comand.accountDocument);
        if (account) {
            account.debit(comand.amount);
        }
    }
}
exports.default = DebitHandler;
