const path = require('path');
const resolve = path.resolve;
const TJS = require('typescript-json-schema');
const fs = require('fs');

const settings = {
    required: true
};

const compilerOptions = {
    strictNullChecks: true
}

const basePath = './';

const program = TJS.getProgramFromFiles([resolve('test.ts')], compilerOptions, basePath);

const generator = TJS.buildGenerator(program, settings);

const symbols = generator.getUserSymbols();

const fileData = JSON.stringify(generator.getSchemaForSymbols(symbols));

const outDir = __dirname + '/schema';

fs.mkdir(outDir, function () {
  console.log('create schema dir');
  fs.writeFile(__dirname + '/schema/test.js', fileData, function () {
    console.log('write complete');
  });
})


