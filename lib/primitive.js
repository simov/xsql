
var error = require('./error');


// "name" | "table"."name" | "schema"."table"."name"
function name (column, table, schema) {
    if (this.typecheck) error.typecheck('name', [column, table, schema]);

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
    if (this.typecheck) error.typecheck('names', [columns, table, schema]);

    var result = [];
    for (var i=0; i < columns.length; i++) {
        result.push(this.name(columns[i],table,schema));
    }

    return result.join(',');
}

// column as name
function as (column, name) {
    if (this.typecheck) error.typecheck('as', [column, name]);
    return [column,'as',name].join(' ');
}

// table alias
function alias (table, name) {
    if (this.typecheck) error.typecheck('alias', [table, name]);
    return [table,this.quotes(name)].join(' ');
}

// func(arg1,arg2,...)
function func (name, args, sep) {
    if (this.typecheck) error.typecheck('func', [name, args, sep]);
    if ('string'===typeof args) args = [args];
    return name+'('+args.join(sep||',')+')';
}

// select col1,col2
function select (args) {
    if (this.typecheck) error.typecheck('select', [args]);
    if ('string'===typeof args) args = [args];
    return 'select '+args.join();
}

// from table
function from (table) {
    if (this.typecheck) error.typecheck('from', [table]);
    return 'from '+table;
}

// left join table on pk1=fk1 and pk2=fk2 ...
function join (table, args, type) {
    if (this.typecheck) error.typecheck('join', [table, args, type]);
    if ('string'===typeof args) args = [args];
    var result = ['join',table,'on',args.join(' and ')];
    if (type) result.splice(0,0,type);
    return result.join(' ');
}

// a = b
function eq (a, b) {
    if (this.typecheck) error.typecheck('eq', [a, b]);
    return a+' = '+b;
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
    this.eq = eq;
};
