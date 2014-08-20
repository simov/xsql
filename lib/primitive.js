
// "name" | "table"."name" | "schema"."table"."name"
function name (column, table, schema) {
    if (!column) throw new Error('xsql.name: Column name required');
    if (!table) return this.quotes(column);

    var result = [];
    if (this.dialect == 'pg') !schema
        ? result.push(this.quotes(this.schema))
        : result.push(this.quotes(schema));

    result.push(this.quotes(table));
    result.push(this.quotes(column));

    return result.join('.');
}

// name,name,...
function names (columns, table, schema) {
    if (!columns||!(columns instanceof Array)||!columns.length)
        throw new Error('xsql.names: Column names array is required');

    var result = [];
    for (var i=0; i < columns.length; i++) {
        result.push(this.name(columns[i],table,schema));
    }

    return result.join(',');
}

// column as name
function as (column, name) {
    if (!column||!name) throw new Error('xsql.as: Both arguments are required');
    return [column,'as',name].join(' ');
}

// table alias
function alias (table, name) {
    if (!table||!name) throw new Error('xsql.alias: Both arguments are required');
    return [table,this.quotes(name)].join(' ');
}

// func(arg1,arg2,...)
function func (name, args, sep) {
    if (!name)
        throw new Error('xsql.func: Function name required');
    if (!args||!(args instanceof Array)||!args.length)
        throw new Error('xsql.func: Function arguments required');
    if (sep&&'string'!==typeof sep)
        throw new Error('xsql.func: Separator should be string');
    return name+'('+args.join(sep||',')+')';
}

// select col1,col2
function select (args) {
    if (!args) throw new Error('xsql.select: Missing argument');
    if (('string'!==typeof args)&&!(args instanceof Array))
        throw new Error('xsql.select: String or Array argument required');
    if ((args instanceof Array)&&!args.length)
        throw new Error('xsql.select: Empty array argument');
    if ('string'===typeof args) args = [args];
    return 'select '+args.join();
}

// from table
function from (table) {
    if (!table) throw new Error('xsql.from: Missing argument');
    if ('string'!==typeof table) throw new Error('xsql.from: String argument required');
    return 'from '+table;
}

// left join table on pk1=fk1 and pk2=fk2 ...
function join (table, args, type) {
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
    if ('string'===typeof args) args = [args];
    var result = ['join',table,'on',args.join(' and ')];
    if (type) result.splice(0,0,type);
    return result.join(' ');
}


exports = module.exports = function () {
    this.name = name;
    this.names = names;
    this.as = as;
    this.alias = alias;
    this.func = func;
    this.select = select;
    this.from = from;
    this.join = join;
};
