import * as core from '@actions/core';
import installFastlane from './install-fastlane';
import { run } from './main';

jest.mock('@actions/core');
jest.mock('./install-fastlane');

const setProcessPlatform = (platform: string) => {
  Object.defineProperty(process, 'platform', {
    value: platform,
  });
};

describe('Setup Fastlane Action', () => {
  describe('install', () => {
    let coreSetFailedSpy: jest.SpyInstance;
    let getInputSpy: jest.SpyInstance;

    beforeEach(async () => {
      coreSetFailedSpy = jest.spyOn(core, 'setFailed');
      getInputSpy = jest.spyOn(core, 'getInput');

      setProcessPlatform('darwin');
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('Calls `installFastlane` with `latest` version', async () => {
      await run();

      expect(installFastlane).toHaveBeenCalledWith('latest');
    });

    it('Calls `installFastlane` with specified version', async () => {
      const fastlaneVersion = '1.2.3';

      getInputSpy.mockReturnValue(fastlaneVersion);

      await run();

      expect(installFastlane).toHaveBeenCalledWith(fastlaneVersion);
    });

    it('Fails on non-unix platforms', async () => {
      setProcessPlatform('win32');

      await run();

      expect(coreSetFailedSpy).toHaveBeenCalled();
    });
  });
});
