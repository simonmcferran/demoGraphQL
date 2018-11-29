const graphql = require('graphql');
const _= require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;

//dummy data
let books = [
    {name: 'Big Simons M2', genre: 'Fantasy', id: '1', authorId:'3' },
    {name: 'The history of the Impreza', genre: 'Thriller', id: '2', authorId:'1' },
    {name: 'When you have all the cars', genre: 'Sci-Fi', id: '3', authorId:'2' }
];
let authors = [
    {name: 'Simon McFerran', age: 35, id: '1'},
    {name: 'Jack McHugh', age: 29, id: '2'},
    {name: 'Adam Dorkington', age: 34, id: '3'}
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        age: {type: GraphQLInt},
        name: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db / other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
