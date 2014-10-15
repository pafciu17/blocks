/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'rx.all': '../lib/rxjs/dist/rx.all.min',
        'rx.all.compat': '../lib/rxjs/dist/rx.all.compat.min',
        rx: '../lib/rxjs/dist/rx.min',
        'rx.compat': '../lib/rxjs/dist/rx.compat.min',
        'rx.aggregates': '../lib/rxjs/dist/rx.aggregates.min',
        'rx.async': '../lib/rxjs/dist/rx.async.min',
        'rx.async.compat': '../lib/rxjs/dist/rx.async.compat.min',
        'rx.async.map': '../lib/rxjs/dist/rx.async.map',
        'rx.backpressure': '../lib/rxjs/dist/rx.backpressure.min',
        'rx.binding': '../lib/rxjs/dist/rx.binding.min',
        'rx.coincidence': '../lib/rxjs/dist/rx.coincidence.min',
        'rx.experimental': '../lib/rxjs/dist/rx.experimental.min',
        'rx.lite': '../lib/rxjs/dist/rx.lite.min',
        'rx.lite.compat': '../lib/rxjs/dist/rx.lite.compat.min',
        'rx.joinpatterns': '../lib/rxjs/dist/rx.joinpatterns.min',
        'rx.testing': '../lib/rxjs/dist/rx.testing.min',
        'rx.time': '../lib/rxjs/dist/rx.time.min',
        'rx.virtualtime': '../lib/rxjs/dist/rx.virtualtime.min',
        underscore: '../lib/underscore/underscore'
    },
    packages: [

    ]
});
require(['main']);
