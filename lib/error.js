
exports.typecheck = function (f, a) {
    switch (f) {
        
    case 'name':
        var column = a[0], table = a[1], schema = a[2];
        if (!column) throw new Error('xsql.name: Column name required');
    break;

    case 'names':
        var columns = a[0], table = a[1], schema = a[2];
        if (!columns||!(columns instanceof Array)||!columns.length)
            throw new Error('xsql.names: Column names array is required');
    break;

    case 'as':
        var column = a[0], name = a[1];
        if (!column||!name) throw new Error('xsql.as: Both arguments are required');
    break;

    case 'alias':
        var table = a[0], name = a[1];
        if (!table||!name) throw new Error('xsql.alias: Both arguments are required');
    break;

    case 'func':
        var name = a[0], args = a[1], sep = a[2];
        if (!name)
            throw new Error('xsql.func: Function name required');
        if (!args||!(args instanceof Array)||!args.length)
            throw new Error('xsql.func: Function arguments required');
        if (sep&&'string'!==typeof sep)
            throw new Error('xsql.func: Separator should be string');
    break;

    case 'select':
        var args = a[0];
        if (!args) throw new Error('xsql.select: Missing argument');
        if (('string'!==typeof args)&&!(args instanceof Array))
            throw new Error('xsql.select: String or Array argument required');
        if ((args instanceof Array)&&!args.length)
            throw new Error('xsql.select: Empty array argument');
        break;

        case 'from':
        var table = a[0];
        if (!table) throw new Error('xsql.from: Missing argument');
        if ('string'!==typeof table) throw new Error('xsql.from: String argument required');
    break;

    case 'join':
        var table = a[0], args = a[1], type = a[2];
        if (!table) throw new Error('xsql.join: Missing first argument');
        if ('string'!==typeof table)
            throw new Error('xsql.join: First argument should be string');
        if (!args) throw new Error('xsql.join: Missing second argument');
        if (('string'!==typeof args)&&!(args instanceof Array))
            throw new Error('xsql.join: Second argument should be Array or String');
        if ((args instanceof Array)&&!args.length)
            throw new Error('xsql.join: Second argument is empty array');
        if (type!==undefined&&'string'!==typeof type)
            throw new Error('xsql.join: Third argument should be string');
    break;
    }
}
