import Account from './Account'

export default class TransferService {
  transfer(sender: Account, receiver: Account, amount: number) {
    sender.debit(amount)
    receiver.credit(amount)
  }
}
