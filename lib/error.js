
exports.typecheck = function (f, a) {
    switch (f) {
        
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
        if ((args instanceof Array)&&!args.length)
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
    }
}
