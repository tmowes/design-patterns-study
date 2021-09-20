"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountRepositoryMemory {
    constructor() {
        this.accounts = [];
    }
    save(account) {
        this.accounts.push(account);
    }
    get(accountDocument) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const account = this.accounts.find(account => account.document === accountDocument);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;
    }
}
exports.default = AccountRepositoryMemory;
