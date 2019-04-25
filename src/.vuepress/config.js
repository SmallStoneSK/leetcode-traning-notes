const path = require('path');

module.exports = {
  base: '/leetcode-traning-notes/',
  title: 'leetcode练习笔记',
  description: '每天1小时，努力不一定成功，但不努力会很轻松',
  dest: path.resolve(__dirname, '../../docs'),
  themeConfig: {
    nav: [
      {text: '题库', link: '/questionBank/1/'},
      {text: 'github', link: 'https://github.com/SmallStoneSK/leetcode-traning-notes'},
      {text: '个人博客', link: 'https://github.com/SmallStoneSK/Blog'}
    ],
    sidebarDepth: 0,
    sidebar: {
      '/questionBank/': [
        '1/',
        '2/',
        '3/',
        '7/',
        '8/',
        '9/',
        '12/',
        '13/',
        '14/',
        '17/',
        '22/',
      ]
    }
  }
};