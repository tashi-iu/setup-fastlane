import { exec } from '@actions/exec';
import { info } from '@actions/core';
import getInstalledFastlaneVersion from './get-installed-fastlane-version';

export default async function installFastlane(version: string) {
  const installedVersion = await getInstalledFastlaneVersion();
  if (installedVersion === version) {
    return info(
      `Specified Fastlane version ${version} is already installed. Skipping install.`
    );
  }

  if (installedVersion) {
    await exec('gem', [
      'uninstall',
      'fastlane',
      '--all',
      '--executables',
      '--ignore-dependencies',
    ]);
  }

  const versionArgs = version === 'latest' ? [] : ['-v', version];
  await exec('gem', ['install', 'fastlane', ...versionArgs, '--no-document']);

  info(`Fastlane ${version} has been installed successfully`);
}
