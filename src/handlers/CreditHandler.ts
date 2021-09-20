import AccountRepository from '../AccountRepository'
import CreditCommand from '../application/commands/CreditCommand'
import Observer from '../Observer'

export default class CreditHandler implements Observer {
  operation = 'credit'

  constructor(readonly accountRepository: AccountRepository) {}

  notify(comand: CreditCommand): void {
    const account = this.accountRepository.get(comand.accountDocument)
    if (account) {
      account.credit(comand.amount)
    }
  }
}
