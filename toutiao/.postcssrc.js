// module.exports = {
//   plugins: {
//     'postcss-pxtorem': {
//       rootValue ({ file }) {
//         return file.indexOf('vant') !== -1 ? 37.5 : 75
//       },
//       propList: ['*']
//     }
//   }
// }
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}