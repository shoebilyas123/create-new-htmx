import { Command } from 'commander';
import select, { Separator } from '@inquirer/select';
import { input } from '@inquirer/prompts';

import { generateJavascriptHTMXTemplate } from './generateTemplate';
import { _pkgManagerChoices, _technologyChoices } from './constants';

const program = new Command();

program.option('--name', 'Enter your project name');
program.parse(process.argv);
const options = program.opts();

const initNpx = async () => {
  const _projectName = await input({
    message: 'Enter project name: ',
  });

  const _technology = await select({
    message: 'Choose the technology',
    choices: _technologyChoices,
  });

  const _pkgManager = await select({
    message: 'Choose the package manager',
    choices: _pkgManagerChoices,
  });

  generateJavascriptHTMXTemplate({
    pkgManager: _pkgManager,
    technology: _technology,
    projectName: _projectName,
  });
};

initNpx();
