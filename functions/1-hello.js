//domain/.netlify/functions/1-hello

//const person = { name: "Girish" };

exports.handler = async (event, context, cb) => {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: "Our first Netlify Functions",
  };
};
