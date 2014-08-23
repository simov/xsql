
var xsql = require('../lib/instance');


describe('instance', function () {
    describe('throw', function () {
        it('throw on missing dialect name', function () {
            (function () {
                var x = new xsql();
            }).should.throw('xsql: Missing dialect name');
        });
        it('throw on unsupported dialect', function () {
            (function () {
                var x = new xsql({dialect:'mongodb'});
            }).should.throw('xsql: Not supported dialect');
        });
    });
    
    describe('dialect', function () {
        it('dialects', function () {
            ['mysql', 'sqlite', 'pg'].forEach(function (dialect) {
                var x = new xsql({dialect:dialect});
                x.dialect.should.equal(dialect);
            });
        });
        it('aliases', function () {
            var x = new xsql({dialect:'mariadb'});
            x.dialect.should.equal('mysql');
            x = new xsql({dialect:'maria'});
            x.dialect.should.equal('mysql');
            x = new xsql({dialect:'postgres'});
            x.dialect.should.equal('pg');
            x = new xsql({dialect:'postgresql'});
            x.dialect.should.equal('pg');
        });
        it('escape symbols', function () {
            var x = new xsql({dialect:'mysql'});
            x.quote.should.equal('`');
            x = new xsql({dialect:'sqlite'});
            x.quote.should.equal('"');
            x = new xsql({dialect:'pg'});
            x.quote.should.equal('"');
        });
        it.skip('set escape symbol', function () {
            x = new xsql({dialect:'sqlite'});
            x.quote.should.equal('[]');
        });
    });
    
    describe('pg', function () {
        it('use public schema by default', function () {
            var x = new xsql({dialect:'pg'});
            x.schema.should.equal('public');
        });
        it('set schema name', function () {
            var x = new xsql({dialect:'pg',schema:'schema'});
            x.schema.should.equal('schema');
        });
    });

    describe('typecheck', function () {
        it('enable typecheck by default', function () {
            var x = new xsql({dialect:'pg'});
            (function () {
                x.join();
            }).should.throw('xsql.join: First argument should be String');
        });
        it('disable typecheck', function () {
            var x = new xsql({dialect:'pg', typecheck:false});
            (function () {
                x.join();
            }).should.throw("Cannot call method 'join' of undefined");
        });
    });

    describe('instances', function () {
        it('multiple', function () {
            var mysql = new xsql({dialect:'mysql'}),
                pg = new xsql({dialect:'pg'});
            // instance
            mysql.dialect.should.equal('mysql');
            pg.dialect.should.equal('pg');
            // escape
            mysql.quotes('column').should.equal('`column`');
            pg.quotes('column').should.equal('"column"');
            // primitive
            mysql.name('column','table').should.equal('`table`.`column`');
            pg.name('column','table').should.equal('"table"."column"');
        });
    });
});
