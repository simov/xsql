
var t = require('type-check').typeCheck;

exports.name = 'xsql',
exports.args = ['First', 'Second', 'Third'];


exports.methods = {
    // escape
    quotes     : ['String'],
    wrap       : ['String', 'Undefined|String'],
    escape     : ['String'],
    string     : ['String', 'Undefined|String'],
    // primitive
    name       : ['String', 'Undefined|String', 'Undefined|String'],
    names      : ['Array', 'Undefined|String', 'Undefined|String'],
    as         : ['String', 'String'],
    alias      : ['String', 'String'],
    func       : ['String', 'String|Array', 'Undefined|String'],
    select     : ['String|Array'],
    from       : ['String'],
    join       : ['String', 'String|Array', 'Undefined|String'],
    eq         : ['String', 'String|Number'],
    groupby    : ['String|Array'],
    orderby    : ['String|Object|Array', 'Undefined|String'],
    limit      : ['Number', 'Number'],
    in         : ['String|Number|Array'],
    and        : ['String|Array'],
    or         : ['String|Array'],
    between    : ['String|Number', 'String|Number'],
    like       : ['String'],
    where      : ['String|Array', 'Undefined|String'],
    insert     : ['String', 'String|Array', 'String|Array'],
    update     : ['String', 'String|Array', 'String|Array'],
    delete     : ['String']
};


exports.error = function (func, idx, type) {
    var message = [
        this.name+'.'+func+':',
        this.args[idx], 'argument should be',
        type.replace('Undefined|','')
    ].join(' ');
    throw new Error(message);
}

exports.typecheck = function (func, args) {
    for (var i=0; i < args.length; i++) {
        var type = this.methods[func][i],
            value = args[i];
        if (!t(type, value)) this.error(func, i, type);
    }
}
