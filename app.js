var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// 使用 GraphQL Schema Language 创建一个 schema
// 标量类型有 String、Int、Float、Boolean 和 ID
/*
rollDice(numDice:10,numSide:10)

*/
var schema = buildSchema(`
  type Query {
    hello: String
    quoteOfTheDay:String
    random:Float!
    rollThreeDice:[Int]
    rollDice(numDice:Int!,numSide:Int):[Int]  
  }
`);

// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides;
//   }
//   rollOnce() {
//     return 1 + Math.floor(Math.random() * this.numSides);
//   }
//   roll({ numRolls }) {
//     var output = [];
//     for (let i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce());
//     }
//     return output;
//   }
// }

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  hello: () => {
    return "Hello world!";
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "take it eay" : "salevation";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: args => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * args.numSide));
    }
    return output;
  }
  //   getDie: function({ numSides }) {
  //     return new RandomDie(numSides);
  //   }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("localhost:4000/graphql");
