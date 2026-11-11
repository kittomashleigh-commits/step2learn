/**
 * @typedef {'Arcade' | 'Action' | 'Puzzle' | 'Retro' | 'Casual' | 'Sports' | 'Custom'} GameCategory
 * 
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {GameCategory} category
 * @property {string} iframeSrc
 * @property {string} iframeHtml
 * @property {string} controls
 * @property {number} rating
 * @property {number} plays
 * @property {string} [aspectRatio]
 * @property {string[]} tags
 * @property {string} color
 * @property {boolean} [featured]
 * @property {boolean} [custom]
 * 
 * @typedef {'google-docs' | 'google-classroom' | 'canvas' | 'wikipedia' | 'desmos' | 'none'} CloakPreset
 * 
 * @typedef {Object} CloakConfig
 * @property {CloakPreset} preset
 * @property {string} customTitle
 * @property {string} customFavicon
 * @property {string} panicKey
 * @property {'disguise' | 'redirect'} panicAction
 * @property {string} panicRedirectUrl
 */

export const CATEGORIES = ['All', 'Arcade', 'Action', 'Puzzle', 'Retro', 'Casual', 'Sports'];
