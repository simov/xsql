
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


exports = module.exports = function () {
    this.name = name;
    this.names = names;
    this.func = func;
    this.as = as;
    this.alias = alias;
};
