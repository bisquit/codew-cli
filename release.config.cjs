/*eslint-env commonjs*/

/** @type {import('semantic-release').Options} */
module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
};
