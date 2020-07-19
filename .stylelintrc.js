module.exports = {
  plugins: ['stylelint-scss'], // stylelint-scss を使う
  extends: [
    'stylelint-config-standard', //ベースの設定ファイル
    'stylelint-config-rational-order',
  ],
  rules: {
    'at-rule-no-unknown': null, //scssで使える @include などにエラーがでないようにする
    'scss/at-rule-no-unknown': true, //scssでもサポートしていない @ルール にはエラーを出す
    'indentation': 4,
  }
};