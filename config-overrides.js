// config-overrides.js - это конфигурационный файл для react-app-alias
// jsconfig.paths.json - это конфигурационный файл для react-app-rewired. Пути и алиасы настраиваются в нём.
// Они работают вместе и оба нужны для создания алиасов для удобного написания путей к файлам

const {aliasWebpack} = require('react-app-alias');
const options = {} // default is empty for most cases

module.exports = aliasWebpack(options);