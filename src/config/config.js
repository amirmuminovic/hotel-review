export default {
  development: {
    port: 3000,
    dbUrl: 'mongodb://mongo:27017/hotelReview',
    sendgridAPIKey: 'THIS_WILL_BE_ADDED_IN_THE_CODE_BUILD_PIPELINE_AS_A_PARAM',
    jwtSecret: 'THIS_WILL_BE_ADDED_IN_THE_CODE_BUILD_PIPELINE_AS_A_PARAM',
  },
};
