import { Command } from './command.interface.js';
import chalk from 'chalk';
import { version } from '../../../package.json';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    return version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const ver = this.readVersion();
      console.info(chalk.bgMagenta(ver));
    } catch (error: unknown) {
      console.error(chalk.redBright(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.redBright(error.message));
      }
    }
  }
}
