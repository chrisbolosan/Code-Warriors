const jwt = require("jsonwebtoken");

const { id } = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjNjYWEzYTBiODRjYWYyMTdmM2RjNiIsImlhdCI6MTYyOTk0MzM3NSwiZXhwIjoxNjMyNTM1Mzc1fQ.pCau7zTqiXMUJ90hbPrihEnZBt4oQ6Apu5_BnUzd9RA",
  "banana"
);

console.log(id);
