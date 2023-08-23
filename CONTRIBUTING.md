## develop

```sh
# Install dependencies
pnpm i

# Run src (index.ts) directly
pnpm dev
pnpm dev .
```

### Testing

```sh
pnpm test
```

### Test local build version behavior

```sh
# linking this pkg to global
pnpm link -g

# watch build
## normal build (which is the same as production shipped)
pnpm build --watch
## debug mode (log extra informations)
pnpm build:debug --watch

# Then, cd any directory
codew
```

If you installed published version, be sure removing it to avoid confliction.

```sh
pnpm ls -g
pnpm rm -g codew
```

## publish

```sh
# Bump version, commit, tag, push
pnpm bump
```

Then, Github Actions will publish to npm.
