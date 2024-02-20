# Setup Fastlane

[![versions](https://github.com/tashi-iu/setup-fastlane/actions/workflows/build.yml/badge.svg)](https://github.com/tashi-iu/setup-fastlane/actions/workflows/build.yml)

Action to setup Fastlane for GitHub Actions runners.

## Usage

### Basic Configuration

```yaml
- uses: tashi-iu/setup-fastlane@v1
  with:
    # Optional. Default: 'latest'
    version: '2.219.0'
```

### Caching Fastlane Versions

_Only the last used Fastlane version is cached as of now. Multiple versions caching coming soon._

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
