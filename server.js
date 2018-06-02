var { graphql, buildSchema } = require("graphql");

var schema = buildSchema(`
 type Query {
     hello:String
 }
`);

var root = {
  hello: () => {
    return "hello world";
  }
};

graphql(schema, "{hello}", root).then(reponse => {
  console.log(reponse);
});
