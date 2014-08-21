
exports.typecheck = function (f, a) {
    switch (f) {

    // escape

    case 'quotes':
        var name = a[0];
        if (!name)
            throw new Error('xsql.quotes: First argument is required');
        if ('string'!==typeof name)
            throw new Error('xsql.quotes: First argument should be string');
    break;

    case 'wrap':
        var str = a[0], quote = a[1];
        if (!str)
            throw new Error('xsql.wrap: First argument is required');
        if ('string'!==typeof str)
            throw new Error('xsql.wrap: First argument should be string');
        if (quote&&'string'!==typeof quote)
            throw new Error('xsql.wrap: Second argument should be string');
    break;

    case 'escape':
        var str = a[0];
        if (!str)
            throw new Error('xsql.escape: First argument is required');
        if ('string'!==typeof str)
            throw new Error('xsql.escape: First argument should be string');
    break;

    case 'string':
        var str = a[0], quote = a[1];
        if (!str)
            throw new Error('xsql.string: First argument is required');
        if ('string'!==typeof str)
            throw new Error('xsql.string: First argument should be string');
        if (quote&&'string'!==typeof quote)
            throw new Error('xsql.string: Second argument should be string');
    break;

    // primitive

    case 'name':
        var column = a[0], table = a[1], schema = a[2];
        if (!column)
            throw new Error('xsql.name: First argument is required');
        if ('string'!==typeof column)
            throw new Error('xsql.name: First argument should be string');
        if (table&&'string'!==typeof table)
            throw new Error('xsql.name: Second argument should be string');
        if (schema&&'string'!==typeof schema)
            throw new Error('xsql.name: Third argument should be string');
    break;

    case 'names':
        var columns = a[0], table = a[1], schema = a[2];
        if (!columns)
            throw new Error('xsql.names: First argument is required');
        if (!(columns instanceof Array))
            throw new Error('xsql.names: First argument should be array');
        if (!columns.length)
            throw new Error('xsql.names: First argument is empty array');
        if (table&&'string'!==typeof table)
            throw new Error('xsql.names: Second argument should be string');
        if (schema&&'string'!==typeof schema)
            throw new Error('xsql.names: Third argument should be string');
    break;

    case 'as':
        var column = a[0], name = a[1];
        if (!column||!name)
            throw new Error('xsql.as: Both arguments are required');
        if ('string'!==typeof column||'string'!==typeof name)
            throw new Error('xsql.as: Both arguments should be strings');
    break;

    case 'alias':
        var table = a[0], name = a[1];
        if (!table||!name)
            throw new Error('xsql.alias: Both arguments are required');
        if ('string'!==typeof table||'string'!==typeof name)
            throw new Error('xsql.alias: Both arguments should be strings');
    break;

    case 'func':
        var name = a[0], args = a[1], sep = a[2];
        if (!name)
            throw new Error('xsql.func: First argument is required');
        if ('string'!==typeof name)
            throw new Error('xsql.func: First argument should be string');
        if (!args)
            throw new Error('xsql.func: Second argument is required');
        if ('string'!==typeof args&&!(args instanceof Array))
            throw new Error('xsql.func: Second argument should be string or array');
        if (!args.length)
            throw new Error('xsql.func: Second argument is empty array');
        if (sep&&'string'!==typeof sep)
            throw new Error('xsql.func: Third argument should be string');
    break;

    case 'select':
        var args = a[0];
        if (!args)
            throw new Error('xsql.select: First argument is required');
        if (('string'!==typeof args)&&!(args instanceof Array))
            throw new Error('xsql.select: First argument should be string or array');
        if ((args instanceof Array)&&!args.length)
            throw new Error('xsql.select: First argument is empty array');
        break;

    case 'from':
        var table = a[0];
        if (!table)
            throw new Error('xsql.from: First argument is required');
        if ('string'!==typeof table)
            throw new Error('xsql.from: First argument should be string');
    break;

    case 'join':
        var table = a[0], args = a[1], type = a[2];
        if (!table)
            throw new Error('xsql.join: First argument is required');
        if ('string'!==typeof table)
            throw new Error('xsql.join: First argument should be string');
        if (!args)
            throw new Error('xsql.join: Second argument is required');
        if (('string'!==typeof args)&&!(args instanceof Array))
            throw new Error('xsql.join: Second argument should be string or array');
        if (!args.length)
            throw new Error('xsql.join: Second argument is empty array');
        if (type!==undefined&&'string'!==typeof type)
            throw new Error('xsql.join: Third argument should be string');
    break;

    case 'eq':
        var x = a[0], y = a[1];
        if (!x||!y)
            throw new Error('xsql.eq: Both arguments are required');
        if ('string'!==typeof x||'string'!==typeof y)
            throw new Error('xsql.eq: Both arguments should be strings');
    break;

    case 'groupby':
        var args = a[0];
        if (!args)
            throw new Error('xsql.groupby: First argument is required');
        if ('string'!==typeof args&&!(args instanceof Array))
            throw new Error('xsql.groupby: First argument should be string or array');
        if (!args.length)
            throw new Error('xsql.groupby: First argument is empty');
    break;

    case 'orderby':
        var args = a[0], order = a[1];
        if (!args)
            throw new Error('xsql.orderby: First argument is required');
        if ('string'!==typeof args&&!(args instanceof Array)&&!(args instanceof Object))
            throw new Error('xsql.orderby: First argument should be string, array or object');
        if (('string'===typeof args||(args instanceof Array))&&!args.length)
            throw new Error('xsql.orderby: First argument is empty');
    break;

    case 'limit':
        var x = a[0], y = a[1];
        if (!x||!y)
            throw new Error('xsql.limit: Both arguments are required');
        if ('number'!==typeof x||'number'!==typeof y)
            throw new Error('xsql.limit: Both arguments should be numbers');
    break;

    case 'in':
        var args = a[0];
        if (!args)
            throw new Error('xsql.in: First argument is required');
    break;
    }
}
