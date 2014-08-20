
var escape = require('./escape'),
    primitive = require('./primitive');


var dialect = {
    name: ['mysql', 'sqlite', 'pg'],
    alias: ['mariadb', 'maria', 'postgres', 'postgresql']
};

function xsql (options) {
    options = options||{};

    // dialect
    if (!options.dialect)
        throw new Error('xsql: Missing dialect name');
    if (dialect.name.concat(dialect.alias).indexOf(options.dialect) == -1)
        throw new Error('xsql: Not supported dialect');
    if (dialect.name.indexOf(options.dialect) != -1)
        this.dialect = options.dialect;
    else {
        if (options.dialect.indexOf('maria') == 0) this.dialect = 'mysql';
        else if (options.dialect.indexOf('postgre') == 0) this.dialect = 'pg';
    }

    // quotes
    if (this.dialect == 'mysql') this.quote = '`';
    else if (this.dialect == 'sqlite') this.quote = '"';
    else if (this.dialect == 'pg') this.quote = '"';

    // schema
    if (this.dialect == 'pg') this.schema = options.schema||'public';

    // typecheck
    if (options.typecheck!==undefined&&'boolean'!==typeof options.typecheck)
        throw new Error('xsql: Typecheck parameter should be boolean');
    this.typecheck = 'boolean'===typeof options.typecheck
        ? options.typecheck
        : true;

    // extend
    escape.call(this);
    primitive.call(this);
}


exports = module.exports = xsql;
