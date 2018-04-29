const ghpages = require('gh-pages');

ghpages.publish('build', {
  src: [
    '**/*',
    '!**/*.map',
  ],
  branch: 'gh-pages',
  repo: 'https://github.com/sn0wle0pard/mips-studio.git',
  dotfiles: true,
});
