"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountRepository_1 = __importDefault(require("../src/AccountRepository"));
const AccountApplicationService_1 = __importDefault(require("../src/application/services/AccountApplicationService"));
const CreditHandler_1 = __importDefault(require("../src/handlers/CreditHandler"));
const DebitHandler_1 = __importDefault(require("../src/handlers/DebitHandler"));
const TransferHandler_1 = __importDefault(require("../src/handlers/TransferHandler"));
const Publisher_1 = __importDefault(require("../src/Publisher"));
const accountSender = {
    bank: '069',
    branch: '0001',
    account: '987654-9',
    document: '111.111.111-11',
};
const accountReceiver = {
    bank: '069',
    branch: '0002',
    account: '698745-9',
    document: '222.222.222-22',
};
let service;
beforeEach(() => {
    const publisher = new Publisher_1.default();
    const accountRepository = new AccountRepository_1.default();
    publisher.register(new CreditHandler_1.default(accountRepository));
    publisher.register(new DebitHandler_1.default(accountRepository));
    publisher.register(new TransferHandler_1.default(accountRepository));
    service = new AccountApplicationService_1.default(publisher, accountRepository);
});
test('Should be able to create a account', () => {
    service.create(accountSender.document);
    const account = service.get(accountSender.document);
    expect(account.getBalance()).toBe(0);
});
test('Should be able to create a account and do a deposit', () => {
    service.create(accountSender.document);
    service.credit(accountSender.document, 1024);
    const account = service.get(accountSender.document);
    expect(account.getBalance()).toBe(1024);
});
test('Should be able to create a account and do a withdraw', () => {
    service.create(accountSender.document);
    service.credit(accountSender.document, 1024);
    service.debit(accountSender.document, 512);
    const account = service.get(accountSender.document);
    expect(account.getBalance()).toBe(512);
});
test('Should be able to create two accounts and do a transfer between them', () => {
    service.create(accountSender.document);
    service.credit(accountSender.document, 1024);
    service.create(accountReceiver.document);
    service.credit(accountReceiver.document, 512);
    service.transfer(accountSender.document, accountReceiver.document, 768);
    const accountFrom = service.get(accountSender.document);
    const accountTo = service.get(accountReceiver.document);
    expect(accountFrom.getBalance()).toBe(256);
    expect(accountTo.getBalance()).toBe(1280);
});
