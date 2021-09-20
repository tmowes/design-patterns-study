"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransferService {
    transfer(sender, receiver, amount) {
        sender.debit(amount);
        receiver.credit(amount);
    }
}
exports.default = TransferService;
