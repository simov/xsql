
var t = require('./typecheck');


// "name" | "table"."name" | "schema"."table"."name"
function name (column, table, schema) {
    if (this.typecheck) t.typecheck('name', [column, table, schema]);

    var result = [];
    schema && result.push(this.quotes(schema));
    table && result.push(this.quotes(table));
    column && result.push(this.quotes(column));
    return result.join('.');
}

// name,name,...
function names (columns, table, schema) {
    if (this.typecheck) t.typecheck('names', [columns, table, schema]);

    var result = [];
    for (var i=0; i < columns.length; i++) {
        result.push(this.name(columns[i],table,schema));
    }

    return result.join(',');
}

// column as name
function as (column, name) {
    if (this.typecheck) t.typecheck('as', [column, name]);
    return [column,'as',name].join(' ');
}

// table alias
function alias (table, name) {
    if (this.typecheck) t.typecheck('alias', [table, name]);
    return [table,name].join(' ');
}

// func(arg1,arg2,...)
function func (name, args, sep) {
    if (this.typecheck) t.typecheck('func', [name, args, sep]);
    if ('string'===typeof args) args = [args];
    return name+'('+args.join(sep||',')+')';
}

// select col1,col2
function select (args) {
    if (this.typecheck) t.typecheck('select', [args]);
    if ('string'===typeof args) args = [args];
    return 'select '+args.join();
}

// from table
function from (table) {
    if (this.typecheck) t.typecheck('from', [table]);
    return 'from '+table;
}

// left join table on pk1=fk1 and pk2=fk2 ...
function join (table, args, type) {
    this.typecheck && t.typecheck('join', [table, args, type]);
    if ('string'===typeof args) args = [args];
    var result = ['join',table,'on',args.join(' and ')];
    if (type) result.splice(0,0,type);
    return result.join(' ');
}

// a = b
function eq (a, b) {
    if (this.typecheck) t.typecheck('eq', [a, b]);
    return a+' = '+b;
}

// group by arg1,arg2 ...
function groupby (args) {
    if (this.typecheck) t.typecheck('groupby', [args]);
    if ('string'===typeof args) args = [args];
    return 'group by '+args.join();
}

// order by col1 asc, col2 desc ...
function orderby (args, order) {
    if (this.typecheck) t.typecheck('orderby', [args, order]);
    
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
    if (this.typecheck) t.typecheck('limit', [a, b]);
    return 'limit '+[a,b].join();
}

// and expr
function and (expr) {
    if (this.typecheck) t.typecheck('and', [expr]);
    if ('string'===typeof expr) return 'and '+expr;
    if (expr instanceof Array) return expr.join(' and ');
}

// or expr
function or (expr) {
    if (this.typecheck) t.typecheck('or', [expr]);
    if ('string'===typeof expr) return 'or '+expr;
    if (expr instanceof Array) return expr.join(' or ');
}

// between a and b
function between (a, b) {
    if (this.typecheck) t.typecheck('between', [a, b]);
    return ['between',a,'and',b].join(' ');
}

// like str
function like (str) {
    if (this.typecheck) t.typecheck('like', [str]);
    return 'like '+str;
}

// where expr1 and expr2 ...
function where (args, operator) {
    if (this.typecheck) t.typecheck('where', [args, operator]);
    if ('string'===typeof args) return 'where '+args;
    return 'where ' + args.join(' '+(operator||'and')+' ');
}

// insert into tbl (col1,col2) values (val1,val2) ...
function insert (table, columns, values) {
    if (this.typecheck) t.typecheck('insert', [table, columns, values]);
    if ('string'===typeof columns) columns = [columns];
    if ('string'===typeof values) values = [values];

    var get = function get (values) {
        var result = [];
        for (var i=0; i < values.length; i++) {
            var value = values[i];
            if ('string'===typeof value) value = this.string(value);
            if (value===null) value = 'null';
            result.push(value);
        }
        return result;
    }.bind(this);

    var result = [];
    if (values[0] instanceof Array) {
        for (var i=0; i < values.length; i++) {
            var val = get(values[i]);
            result.push('('+val.join()+')');
        }
    }
    else {
        var val = get(values);
        result.push('('+val.join()+')');
    }

    return ['insert','into',table,'('+columns.join()+')','values',result.join()].join(' ');
}

// update tbl set col1=val1,col2=val2 ...
function update (table, columns, values) {
    if (this.typecheck) t.typecheck('update', [table, columns, values]);
    if ('string'===typeof columns) {
        columns = [columns];
        values = [values];
    }
    var result = [];
    for (var i=0; i < columns.length; i++) {
        var value = ('string'===typeof values[i]) ? this.string(values[i]) : values[i];
        result.push(columns[i]+'='+value);
    }
    return ['update',table,'set',result.join()].join(' ');
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
    this.and = and;
    this.or = or;
    this.between = between;
    this.like = like;
    this.where = where;
    this.insert = insert;
    this.update = update;
    // in (arg1,arg2,...)
    this.in = function (args) {
        if (this.typecheck) t.typecheck('in', [args]);
        if (!(args instanceof Array)) args = [args];

        var result = [];
        for (var i=0; i < args.length; i++) {
            'string'===typeof args[i]
                ? result.push(this.string(args[i]))
                : result.push(args[i]);
        }

        return 'in('+result.join()+')';
    };
    // delete from tbl
    this.delete = function (table) {
        if (this.typecheck) t.typecheck('delete', [table]);
        return ['delete','from',table].join(' ');
    };
};
