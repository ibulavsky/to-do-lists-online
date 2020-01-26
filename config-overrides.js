const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#c41d7f',
            '@heading-color': '#000', // heading text color
            '@text-color': '#000', // major text color
            '@text-color-secondary': '#333', // secondary text color
            '@border-color-base': '#ddd', // major border color
        },
    }),
)
