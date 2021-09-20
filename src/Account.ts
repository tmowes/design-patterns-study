/* eslint-disable import/no-cycle */
import AccountBuilder from './AccountBuilder'
import Transaction from './Transaction'

export default class Account {
  private bank: string | undefined

  private branch: string | undefined

  private account: string | undefined

  document: string

  private transactions: Transaction[]

  constructor(accountBuilder: AccountBuilder) {
    this.bank = accountBuilder.bank
    this.branch = accountBuilder.branch
    this.account = accountBuilder.account
    this.document = accountBuilder.document
    this.transactions = []
  }

  credit(amount: number) {
    this.transactions.push(new Transaction('credit', amount))
  }

  debit(amount: number) {
    this.transactions.push(new Transaction('debit', amount))
  }

  getBalance() {
    return this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'credit' ? acc + transaction.amount : acc - transaction.amount,
      0,
    )
  }
}
