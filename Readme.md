# Node.js + MongoDB + GraphQL server

## Development

```$ npm install```

```$ node index.js```

The server will be running at `http://localhost:4000/graphql`


```sh
# Query for signup
mutation {
  signup(email:"test@gmail.com", password: "password", name: "test") {
    name
    email
  }
}
```

```sh
# Query for login
mutation {
  login(email:"test@gmail.com", password: "password") {
    name
    email
  }
}
```