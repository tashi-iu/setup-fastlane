import * as core from '@actions/core';
import installFastlane from './install-fastlane';

(async (): Promise<void> => {
  try {
    if (process.platform !== 'darwin' && process.platform !== 'linux') {
      throw new Error(
        `This Action is not compatible with '${process.platform}'. Supported platforms are Linux and MacOS.`
      );
    }

    const version = core.getInput('version', { required: false }) || 'latest';

    await installFastlane(version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
      return;
    }
    core.setFailed('An error occurred while trying to install Fastlane.');
  }
})();
