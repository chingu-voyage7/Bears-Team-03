module.exports = process.env.mode === 'production' ? require('./keys_prod') : require('./keys_dev');
