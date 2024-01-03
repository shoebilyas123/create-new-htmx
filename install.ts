import spawn from 'cross-spawn';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export default function install(pkgManager: PackageManager, cwd: string) {
  spawn.sync(pkgManager, ['install'], { stdio: 'inherit', cwd });
  spawn.sync(pkgManager, pkgManager === 'npm' ? ['run dev'] : ['dev'], {
    cwd,
    stdio: 'inherit',
  });
}
