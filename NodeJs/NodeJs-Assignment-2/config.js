module.exports = {
  dbConnection: {
    user: "postgres",
    password: "123456",
    host: "localhost",
    database: "CarDatabase",
    port: 5432,
  },
  server: {
    PORT: 8080,
  },
  jwtConfig: {
    algorithm: "HS256",
    secretKey: "Test@12345",
  },
  imageURL: {
    url: "http://localhost:3000/public/images/",
  },
};
