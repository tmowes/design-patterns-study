import Command from './application/commands/Command'

export default interface Observer {
  operation: string
  notify(command: Command): void
}
