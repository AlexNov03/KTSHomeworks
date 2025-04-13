const plugins = [
  process.env.NODE_ENV === 'development' && 'react-refresh/babel',
  '@babel/plugin-proposal-optional-chaining',
].filter(Boolean);
const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', 'mobx'];
export default {
  plugins,
  presets,
};
