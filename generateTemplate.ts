import path from 'path';
import * as fs from 'fs';
import install, { PackageManager } from './install';
import { _technologyChoices } from './constants';
import spawn from 'cross-spawn';

interface GenerateHTMXTemplateParams {
  projectName: string;
  pkgManager: PackageManager;
  technology: 'javascript' | 'typescript' | 'go';
}

export const generateJavascriptHTMXTemplate = async ({
  projectName,
  technology,
  pkgManager,
}: GenerateHTMXTemplateParams) => {
  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

  const templateDir = path.resolve(__dirname, `templates/${technology}`);

  console.log('Creating the directory...');
  try {
    fs.mkdirSync(projectDir);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(
    '\n\n\nInitializing empty git repository in the project directory'
  );
  spawn.sync('git', ['init'], { cwd: projectDir, stdio: 'inherit' });

  fs.cpSync(templateDir, projectDir, { recursive: true });

  fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
  );

  const projectPackageJson = require(path.join(projectDir, 'package.json'));
  projectPackageJson.name = projectName;

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
  );

  console.log('\n\n\nInstalling dependencies...');
  install(pkgManager, projectDir);
  console.log('\n\n\n');
  console.log('HTMX project installed :)');
};
