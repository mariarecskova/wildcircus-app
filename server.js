const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //configures the environment variables
const graphqlHttp = require("express-graphql");//I require these dependencies
const { buildSchema } = require("graphql");

const Performance = require("./models/performance");

const app = express();
const port = process.env.PORT || 5000;//we create our express server

// app.use(cors());//middleware
app.use(express.json());//parse JSON data

app.use("/graphql", graphqlHttp({ //build the graphql schema
    schema: buildSchema(`
    type Performance {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input PerformanceInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        performances: [Performance!]!

    }
    type RootMutation {
        createPerformance(performanceInput: PerformanceInput ): Performance

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        performances: () => {
            return Performance.find()
                .then(performances => {
                    return performances.map(performance => {
                        return { ...performance._doc, _id: performance.id } //core perf. data added from Mongoose that is a string
                    });
                })
                .catch(err => {
                    throw err;
                });
            // ["Juggling on the slackline", "Fire Show", "Tiger taming"]
        },
        createPerformance: args => {
            const performance = new Performance({
                title: args.performanceInput.title,
                description: args.performanceInput.description,
                price: +args.performanceInput.price,
                // image: args.imageInput.image,
                date: new Date(args.performanceInput.date)
            });
            return performance
                .save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc, _id: performance.id };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
    },
    graphiql: true
}));

const uri = process.env.ATLAS_URI;//we need to get it from Mongo Atlas- env var.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB datababase connection established");
})

app.listen(port, () => { //this is what starts the server
    console.log(`server is running on port: ${port}`);
}
);
