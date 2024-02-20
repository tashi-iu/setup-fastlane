import * as exec from '@actions/exec';
import installFastlane from './install-fastlane';
import * as getInstalledFastlaneVersionModule from './get-installed-fastlane-version';

jest.mock('@actions/core');
jest.mock('@actions/exec');
jest.mock('./get-installed-fastlane-version');

describe('Install Fastlane', () => {
  let execSpy: jest.SpyInstance;
  let getInstalledFastlaneVersionSpy: jest.SpyInstance;

  beforeEach(() => {
    execSpy = jest.spyOn(exec, 'exec');
    getInstalledFastlaneVersionSpy = jest.spyOn(
      getInstalledFastlaneVersionModule,
      'default'
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Installs latest Fastlane version', async () => {
    await installFastlane('latest');
    expect(execSpy).toHaveBeenNthCalledWith(2, 'gem', [
      'install',
      'fastlane',
      '--no-document',
    ]);
  });

  it('Installs specific Fastlane version', async () => {
    const fastlaneVersion = '1.2.3';
    await installFastlane(fastlaneVersion);
    expect(execSpy).toHaveBeenNthCalledWith(2, 'gem', [
      'install',
      'fastlane',
      '-v',
      fastlaneVersion,
      '--no-document',
    ]);
  });

  it('Uninstalls installed Fastlane versions', async () => {
    await installFastlane('latest');
    expect(execSpy).toHaveBeenNthCalledWith(1, 'gem', [
      'uninstall',
      'fastlane',
      '--all',
      '--executables',
      '--ignore-dependencies',
    ]);
  });

  it('Skips installation if version already present', async () => {
    const fastlaneVersion = '1.2.3';
    getInstalledFastlaneVersionSpy.mockReturnValue(fastlaneVersion);
    await installFastlane(fastlaneVersion);
    expect(execSpy).toHaveBeenCalledTimes(0);
  });
});
