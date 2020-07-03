let pkgJson: any = {};
[
  './package.json',
  '../package.json',
  '../../package.json',
].forEach(f => {
  try {
    if (pkgJson.version) return;
    pkgJson = require(f);
  } catch(e) {}
});

export const VERSION = process.env.VERSION || pkgJson.version;
export const EXT_NAMESPACE = process.env.EXT_NAMESPACE || pkgJson.name;
export const AUTHOR = process.env.AUTHOR || pkgJson.author;
export const ENV = process.env.NODE_ENV || 'production';
export const DISPLAY_NAME = process.env.DISPLAY_NAME || 'SQLTools';
export const DOCS_ROOT_URL = 'https://vscode-sqltools.mteixeira.dev';
export const TREE_SEP = '/-##-/';

// query parsing
export const DELIMITER_START_REGEX = /(?:[\r\n]+)(\s*-{2,}\s*@block.*)$/guim;
export const DELIMITER_START_REPLACE_REGEX = /^(\s*-{2,}\s*@block.*)$/guim;

// notifications
export const ServerErrorNotification = 'Core/errorNotification';
