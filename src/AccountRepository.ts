import Account from './Account'
import IAccountRepository from './IAccountRepository'

export default class AccountRepositoryMemory implements IAccountRepository {
  accounts: Account[]

  constructor() {
    this.accounts = []
  }

  save(account: Account) {
    this.accounts.push(account)
  }

  get(accountDocument: string): Account {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const account = this.accounts.find(account => account.document === accountDocument)
    if (!account) {
      throw new Error('Account not found')
    }
    return account
  }
}
