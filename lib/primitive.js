
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

// group by arg1,arg2 ...
function groupby (args) {
    if (this.typecheck) error.typecheck('groupby', [args]);
    if ('string'===typeof args) args = [args];
    return 'group by '+args.join();
}

// order by col1 asc, col2 desc ...
function orderby (args, order) {
    if (this.typecheck) error.typecheck('orderby', [args]);
    
    var o = (order&&'string'===typeof order) ? order : '';
    var result = [];

    if ('string'===typeof args) {
        result = o ? [args+' '+o] : [args];
    }
    else if (args instanceof Array) {
        for (var i=0; i < args.length; i++) {
            if ('string'===typeof args[i]) {
                o ? result.push(args[i]+' '+o) : result.push(args[i]);
            }
            else if ('object'===typeof args[i]) {
                var key = Object.keys(args[i])[0];
                result.push(key+' '+args[i][key]);
            }
        }
    }
    else if (args instanceof Object) {
        var key = Object.keys(args)[0];
        result = [key+' '+args[key]];
    }

    return 'order by '+result.join();
}

// limit 1,2
function limit (a, b) {
    if (this.typecheck) error.typecheck('limit', [a, b]);
    return 'limit '+[a,b].join();
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
    this.groupby = groupby;
    this.orderby = orderby;
    this.limit = limit;
    // in
    this.in = function (args) {
        if (this.typecheck) error.typecheck('in', [args]);
        if (!(args instanceof Array)) args = [args];
        var result = [];
        for (var i=0; i < args.length; i++) {
            'string'===typeof args[i]
                ? result.push(this.string(args[i]))
                : result.push(args[i]);
        }
        return 'in('+result.join()+')';
    }
};
