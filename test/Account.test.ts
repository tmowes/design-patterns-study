import AccountRepositoryMemory from '../src/AccountRepository'
import AccountApplicationService from '../src/application/services/AccountApplicationService'
import CreditHandler from '../src/handlers/CreditHandler'
import DebitHandler from '../src/handlers/DebitHandler'
import TransferHandler from '../src/handlers/TransferHandler'
import Publisher from '../src/Publisher'

const accountSender = {
  bank: '069',
  branch: '0001',
  account: '987654-9',
  document: '111.111.111-11',
}

const accountReceiver = {
  bank: '069',
  branch: '0002',
  account: '698745-9',
  document: '222.222.222-22',
}

let service: AccountApplicationService

beforeEach(() => {
  const publisher = new Publisher()
  const accountRepository = new AccountRepositoryMemory()
  publisher.register(new CreditHandler(accountRepository))
  publisher.register(new DebitHandler(accountRepository))
  publisher.register(new TransferHandler(accountRepository))
  service = new AccountApplicationService(publisher, accountRepository)
})

test('Should be able to create a account', () => {
  service.create(accountSender.document)
  const account = service.get(accountSender.document)
  expect(account.getBalance()).toBe(0)
})

test('Should be able to create a account and do a deposit', () => {
  service.create(accountSender.document)
  service.credit(accountSender.document, 1024)
  const account = service.get(accountSender.document)
  expect(account.getBalance()).toBe(1024)
})
test('Should be able to create a account and do a withdraw', () => {
  service.create(accountSender.document)
  service.credit(accountSender.document, 1024)
  service.debit(accountSender.document, 512)
  const account = service.get(accountSender.document)
  expect(account.getBalance()).toBe(512)
})

test('Should be able to create two accounts and do a transfer between them', () => {
  service.create(accountSender.document)
  service.credit(accountSender.document, 1024)

  service.create(accountReceiver.document)
  service.credit(accountReceiver.document, 512)

  service.transfer(accountSender.document, accountReceiver.document, 768)

  const accountFrom = service.get(accountSender.document)
  const accountTo = service.get(accountReceiver.document)

  expect(accountFrom.getBalance()).toBe(256)
  expect(accountTo.getBalance()).toBe(1280)
})
