exports.handler = function ({ body }, _, callback) {
  const { user } = JSON.parse(body);
  const { email } = user;

  console.log(`${email} signing up`);

  body = JSON.stringify({
    app_metadata: {
      roles: [`restricted`],
    },
  });

  callback(null, {
    statusCode: 200,
    body,
  });
};
