const MD5 = require("crypto-js/md5");
const Time = new Date();
const playerId = "4t00MwmP";
const API_SECRET = "ZBdVGeEr247eToCosiFfS4sL";

// /**
//  * Returns a signed url, can be used for any "non-JWT" endpoint
//  * @param {string} path
//  * @param {int} expires
//  * @param {string} secret
//  * @param {string}host
//  * @returns {string} A signed url
//  */
function signed_url(
  path,
  expires = 6000,
  secret = API_SECRET,
  host = "https://cdn.jwplayer.com"
) {
  const base = `${path}:${expires}:${secret}`;
  const signature = MD5(base);
  return `${host}/${path}?exp=${expires}&sig=${signature}`;
}

// /**
//  * Return signed url for the single line embed javascript
//  * @param {string} mediaid The media id (also referred to as video key)
//  * @param {string} playerid The player id (also referred to as player key)
//  * @returns
//  */
function get_response(mediaid, playerid) {
  const path = `players/${mediaid}-${playerid}.js`;
  const expires = Math.ceil((Time.getTime() + 3600) / 300) * 300;
  return signed_url(path, expires);
}

console.log(get_response("MEDIAID", "PLAYERID"));
