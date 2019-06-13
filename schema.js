const graphql = require('graphql');
const axios = require('axios');
const md5 = require('js-md5');

const public_key = process.env.PUBLIC_KEY;
const private_key = process.env.PRIVATE_KEY;
const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
const timestamp = new Date().getTime();
const hash = md5.hex(timestamp + private_key + public_key);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ThumbnailType = new GraphQLObjectType({
  name: 'Thumbnail',
  fields: () => ({
    path: {
      type: GraphQLString
    },
    extension: {
      type: GraphQLString
    }
  })
})

// Character Type
const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    thumbnail: {
      type: ThumbnailType
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    character: {
      type: CharacterType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parentValue, args) {
        const auth = `${args.id}?ts=${timestamp}&apikey=${'c9d9bd20d78e4865ef21b0b3e319a4d5'}&hash=${hash}`;
        const url = `${baseUrl}${auth}`;
        return axios.get(url)
          .then(res => res.data.data.results[0])
          .catch(err => console.log(url));
      }
    },
    characters: {
      type: new GraphQLList(CharacterType),
      args: { offset: { type: GraphQLInt } },
      resolve(parentValue, args) {
        const offset = `&offset=${args.offset}`;
        const auth = `?ts=${timestamp}&apikey=${public_key}&hash=${hash}${offset}`;
        const url = `${baseUrl}${auth}`;
        return axios.get(url)
          .then(res => res.data.data.results)
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
