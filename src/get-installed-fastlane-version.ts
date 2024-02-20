import { exec } from '@actions/exec';

export default async function getInstalledFastlaneVersion() {
  let version = '';

  const exitCode = await exec('fastlane', ['--version'], {
    listeners: {
      stdout: (data) => {
        version += data.toString();
      },
    },
    ignoreReturnCode: true,
  });

  if (exitCode !== 0 || !version) return null;

  return version.trim();
}
