requirejs.config({
    baseUrl: "/public/js",
    paths: {
        react: '../js/react',
        'react-dom': '../js/react-dom',
        'e': '../js/lib/e',
    },
});

require(['react-dom', 'lib/Scaffold', 'e'], function (ReactDOM, Scaffold, e) {
    ReactDOM.render(
        e(Scaffold), document.querySelector('#app')
    )
});