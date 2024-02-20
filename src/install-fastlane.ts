import { exec } from '@actions/exec';
import { info } from '@actions/core';

async function getInstalledFastlaneVersion() {
  let version = '';

  const exitCode = await exec('fastlane', ['--version'], {
    listeners: {
      stdout: (data) => {
        version += data.toString();
      },
    },
  });

  if (exitCode !== 0 || !version) return null;

  return version.trim();
}

export default async function installFastlane(version: string) {
  const installedVersion = await getInstalledFastlaneVersion();
  if (installedVersion === version) {
    return info(
      `Specified Fastlane version ${version} is already installed. Skipping install.`
    );
  }

  await exec('gem', [
    'uninstall',
    'fastlane',
    '--all',
    '--executables',
    '--ignore-dependencies',
  ]);

  const versionArgs = version === 'latest' ? [] : ['-v', version];
  await exec('gem', ['install', 'cocoapods', ...versionArgs, '--no-document']);

  info(`Fastlane ${version} has been installed successfully`);
}
