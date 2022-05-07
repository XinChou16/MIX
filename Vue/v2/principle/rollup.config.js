const buildConfigs = [
  {
    id: '1',
    input: './lib-vue2-observer/src/index.js',
    output: './lib-vue2-observer/dist/index.js'
  }
];

function createConfig(config) {
  return {
    input: config.input,
    output: {
      file: config.output
    }
  };
}

export default buildConfigs.map(createConfig);
