import Account from './Account'

export default interface IAccountRepository {
  save(account: Account): void
  get(accountDocument: string): Account
}
