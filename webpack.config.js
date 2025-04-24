import path from 'path';
import { fileURLToPath } from 'url';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.resolve(__dirname, 'build');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              exportLocalsConvention: 'dashes',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

export default {
  entry: path.resolve(__dirname, path.join(srcPath, 'main.tsx')),
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: path.join(__dirname, 'tsconfig.node.json'),
      },
    }),
    !isProd && new ReactRefreshPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(woff2|png|svg|jpg|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      src: srcPath,
      pages: path.join(srcPath, 'pages'),
      store: path.join(srcPath, 'store'),
      utils: path.join(srcPath, 'utils'),
      components: path.join(srcPath, 'components'),
      api: path.join(srcPath, 'api'),
      models: path.join(srcPath, 'models'),
      styles: path.join(srcPath, 'styles'),
      config: path.join(srcPath, 'config'),
    },
  },
};
