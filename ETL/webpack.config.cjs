const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production', // Explicitly set to production for optimized builds
  entry: './src/index.js', // Entry point for your library
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs.js', // CommonJS output
    library: 'MyReactLibrary', // Name of the library
    libraryTarget: 'umd', // Universal Module Definition
    globalObject: 'this', // Ensures compatibility in Node.js and browser environments
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JavaScript/React code
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        options: {
          filterSourceMappingUrl: (url, resourcePath) => {
            return !url.includes('node_modules/rrule');
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS files
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Handle image files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Extensions to resolve
    alias: {
      'devextreme-react/context-menu': 'devextreme-react/context-menu.js',
      'devextreme-react/data-grid': 'devextreme-react/data-grid.js',
      'devextreme-react/popup': 'devextreme-react/popup.js',
      'devextreme-react/button': 'devextreme-react/button.js',
      'devextreme-react/filter-builder': 'devextreme-react/filter-builder.js',
      'devextreme-react/select-box': 'devextreme-react/select-box.js',
      'devextreme-react/switch': 'devextreme-react/switch.js',
      'devextreme-react/accordion': 'devextreme-react/accordion.js',
      utils: path.resolve(__dirname, './src/settings/utils'), // Example alias
    },
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      url: require.resolve('url'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      timers: require.resolve('timers-browserify'),
      util: require.resolve('util'),
      tty: require.resolve('tty-browserify'),
      os: require.resolve('os-browserify/browser'),
      fs: false, // Exclude fs for browser builds
    },
  },
  externals: {
    'devextreme-react/context-menu': 'devextreme-react/context-menu.js',
      'devextreme-react/data-grid': 'devextreme-react/data-grid.js',
      'devextreme-react/popup': 'devextreme-react/popup.js',
      'devextreme-react/button': 'devextreme-react/button.js',
      'devextreme-react/filter-builder': 'devextreme-react/filter-builder.js',
      'devextreme-react/select-box': 'devextreme-react/select-box.js',
      'devextreme-react/switch': 'devextreme-react/switch.js',
      'devextreme-react/accordion': 'devextreme-react/accordion.js',
    react: 'react', // Exclude React from the bundle
    'react-dom': 'react-dom', 'devextreme': 'devextreme', 'devextreme-react': 'devextreme-react','devextreme/runtime': 'devextreme/runtime' // Exclude ReactDOM from the bundle
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css', // Extracted CSS file name
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser', // Provide process polyfill globally
      Buffer: ['buffer', 'Buffer'], // Provide Buffer polyfill globally
    }),
  ],
  stats: {
    errorDetails: true, // Include error details in stats
  },
};
