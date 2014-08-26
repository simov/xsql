
var xsql = require('../lib/instance');
    typecheck = require('../lib/typecheck');


describe('typecheck', function () {
    var x = new xsql({dialect:'pg'});

    var map = {
        types: {
            'String': 'a',
            'Number': 1,
            'Boolean': true,
            'Null': null,
            'Array': [[]],
            'Object': {}
        },
        miss: function (types) {
            for (var key in this.types) {
                if (types.arr.indexOf(key) == -1)
                    return this.types[key];
            }
        },
        match: function (types) {
            for (var key in this.types) {
                if (types.arr.indexOf(key) != -1)
                    return this.types[key];
            }
        }
    };

    var spin = {
        args: function (func, args) {
            var pass = [];
            for (var i=0; i < args.length; i++) {
                var types = {
                    str: args[i],
                    arr: args[i].split('|')
                };
                this.throw(func, args, types, i, pass.concat(map.miss(types)));
                pass.push(map.match(types));
            }
        },
        throw: function (func, args, types, idx, pass) {
            var message = [
                typecheck.name+'.'+func+':',
                typecheck.args[idx], 'argument should be',
                types.str.replace('Undefined|','')
            ].join(' ');

            it(message, function () {
                // console.log(func, pass);
                (function () {
                    x[func].apply(null, pass);
                }).should.throw(message);
            });
        }
    };

    for (var func in typecheck.methods) {
        var args = typecheck.methods[func];
        spin.args(func, args);
    }
});
