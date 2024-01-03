import spawn from 'cross-spawn';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export default function install(pkgManager: PackageManager, cwd: string) {
  spawn.sync('git', ['init'], { cwd, stdio: 'inherit' });
  spawn.sync(pkgManager, ['install'], { stdio: 'inherit', cwd });
}
