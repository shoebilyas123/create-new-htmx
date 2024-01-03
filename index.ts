import select from '@inquirer/select';
import { input } from '@inquirer/prompts';

import { generateJavascriptHTMXTemplate } from './generateTemplate';
import { _pkgManagerChoices, _technologyChoices } from './constants';

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

  await generateJavascriptHTMXTemplate({
    pkgManager: _pkgManager,
    technology: _technology,
    projectName: _projectName,
  });
  process.exit(0);
};

initNpx().then(() => console.log('Project created successfully!'));
