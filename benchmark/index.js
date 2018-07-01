const Benchmark = require('benchmark');
const Fjs = require('fast-json-stringify');

const arrayObject = Array.from({ length: 100 }).map((item, index) => {
  return {
    a: index,
    b: index + 'index'
  }
})
const suite = new Benchmark.Suite();
const json = {
  name: 'fs',
  age: 24,
  love: 'coding',
  arrayString: ['1', '2', '3'],
  arrayObject
};
const schema = {
  title: 'benchmark schema',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    love: {
      type: 'string'
    },
    arrayString: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    arrayObject: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          a: {
            type: 'number'
          },
          b: {
            type: 'string'
          }
        }
      }
    }
  }
}

const stringify = Fjs(schema);

suite.add('Raw JSON.stringify Speed', function() {
  JSON.stringify(json)
})
.add('Fast-JSON-Stringify Speed', function() {
  stringify(json);
})
.on('cycle', function(e) {
  console.log(e.target.toString());
})
.on('complete', function() {
  console.log('Fastest is', this.filter('fastest').map('name'));
})
.run({ async: true });
