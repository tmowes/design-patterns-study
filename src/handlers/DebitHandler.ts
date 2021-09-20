import AccountRepository from '../AccountRepository'
import DebitCommand from '../application/commands/DebitCommand'
import Observer from '../Observer'

export default class DebitHandler implements Observer {
  operation = 'debit'

  constructor(readonly accountRepository: AccountRepository) {}

  notify(comand: DebitCommand): void {
    const account = this.accountRepository.get(comand.accountDocument)
    if (account) {
      account.debit(comand.amount)
    }
  }
}
