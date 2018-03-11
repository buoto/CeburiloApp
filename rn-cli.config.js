/* Patch WTF bug caused by react-native-vector-icons' package.json stored in
 * other package contents, see: https://github.com/oblador/react-native-vector-icons/issues/626#issuecomment-362386341
 */
const blacklist = require('metro/src/blacklist');
module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
  },
};
