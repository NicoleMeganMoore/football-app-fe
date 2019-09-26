module.exports = {
  roots: ["<rootDir>/src"],
  // "transform": {
  //   "^.+\\.tsx?$": "ts-jest"
  // },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./setupTests.js"]
};
