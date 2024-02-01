## develop

```sh
# Install dependencies
bun i

# Run src (index.ts) directly
bun run dev
bun run dev .
```

### Testing

```sh
bun run test
```

### Test local build version behavior

```sh
# linking this pkg to global
bun link -g

# watch build
## normal build (which is the same as production shipped)
bun run build --watch
## debug mode (log extra informations)
bun run build:debug --watch

# Then, cd any directory
codew
```

If you installed published version, be sure removing it to avoid confliction.

```sh
bun pm ls -g
bun rm -g codew-cli
```

## publish

```sh
# Bump version, commit, tag, push
bun run bump
```

Then, Github Actions will publish to npm.

## Compile to binary

```sh
bun run compile
#=> binary generated in bin/

# generate tarball (edit version as appropriate)
# Do not delete until the end of the release (used for sha256 hash calculation)
tar -czf codew-1.0.0-x86_64-apple-darwin.tar.gz bin/codew
```

Then upload tarball to the release.
https://github.com/bisquit/codew-cli/releases

After that, checkout [homebrew-tap repository](https://github.com/bisquit/homebrew-tap) and edit `Formula/codew.rb`.

```rb
class Codew < Formula
  ...
  # edit here
  url "<download link for the tarball>"
  # edit here
  sha256 "<see bellow>"
end
```

Generate sha256sum and copy.

```sh
sha256sum codew-1.0.0-x86_64-apple-darwin.tar.gz | awk '{ print $1 }' | tr -d '\n' | pbcopy
```
