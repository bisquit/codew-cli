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
```
