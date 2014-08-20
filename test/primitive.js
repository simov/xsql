
var xsql = require('../lib/instance');


describe('primitive', function () {
    describe('name', function () {
        it('throw error on missing column name', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.name();
            }).should.throw('xsql.name: Column name required');
        });
        it('column', function () {
            var x = new xsql({dialect:'pg'});
            x.name('column').should.equal('"column"');
        });
        it('table.column', function () {
            var x = new xsql({dialect:'sqlite'});
            x.name('column','table').should.equal('"table"."column"');
        });
        it('table.column pg', function () {
            var x = new xsql({dialect:'pg'});
            x.name('column','table').should.equal('"public"."table"."column"');
        });
        it('schema.table.column', function () {
            var x = new xsql({dialect:'pg'});
            x.name('column','table','schema').should.equal('"schema"."table"."column"');
        });
    });

    describe('names', function () {
        it('throw error on missing first argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.names();
            }).should.throw('xsql.names: Column names array is required');
        });
        it('throw error on non array', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.names(null);
            }).should.throw('xsql.names: Column names array is required');
        });
        it('throw error on empty array', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.names([]);
            }).should.throw('xsql.names: Column names array is required');
        });
        it('colums', function () {
            var x = new xsql({dialect:'pg'});
            x.names(['col1','col2']).should.equal('"col1","col2"');
        });
        it('table.colums', function () {
            var x = new xsql({dialect:'mysql'});
            x.names(['col1','col2'],'tbl')
                .should.equal('`tbl`.`col1`,`tbl`.`col2`');
        });
        it('table.colums pg', function () {
            var x = new xsql({dialect:'pg'});
            x.names(['col1','col2'],'tbl')
                .should.equal('"public"."tbl"."col1","public"."tbl"."col2"');
        });
        it('schema.table.colums', function () {
            var x = new xsql({dialect:'pg'});
            x.names(['col1','col2'],'tbl','schema')
                .should.equal('"schema"."tbl"."col1","schema"."tbl"."col2"');
        });
    });

    describe('as', function () {
        it('throw error on missing arguments', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.as().should.equal('column');
            }).should.throw('xsql.as: Both arguments are required');
        });
        it('throw error on missing second argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.as('column');
            }).should.throw('xsql.as: Both arguments are required');
        });
        it('column as name', function () {
            var x = new xsql({dialect:'pg'});
            x.as('column', 'name').should.equal('column as name');
        });
    });

    describe('alias', function () {
        it('throw error on missing arguments', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.alias().should.equal('column');
            }).should.throw('xsql.alias: Both arguments are required');
        });
        it('throw error on missing second argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.alias('column');
            }).should.throw('xsql.alias: Both arguments are required');
        });
        it('table name', function () {
            var x = new xsql({dialect:'pg'});
            x.alias('table', 'name').should.equal('table "name"');
        });
    });

    describe('func', function () {
        it('throw error on missing function name', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.func('xsql.func: Function name required');
            }).should.throw();
        });
        it('throw error on missing function arguments', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.func('func');
            }).should.throw('xsql.func: Function arguments required');
        });
        it('throw error on non array arguments', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.func('func',null);
            }).should.throw('xsql.func: Function arguments required');
        });
        it('throw error on empty arguments array', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.func('func',[]);
            }).should.throw('xsql.func: Function arguments required');
        });
        it('throw error on non string separator', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.func('func',['arg1'],[]);
            }).should.throw('xsql.func: Separator should be string');
        });
        it('use comma as default argument separator', function () {
            var x = new xsql({dialect:'pg'});
            x.func('func', ['arg1','arg2']).should.equal('func(arg1,arg2)');
        });
        it('specify argument separator', function () {
            var x = new xsql({dialect:'pg'});
            x.func('func', ['arg1','arg2'],' ').should.equal('func(arg1 arg2)');
        });
    });

    describe('select', function () {
        it('throw error on missing argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.select();
            }).should.throw('xsql.select: Missing parameter');
        });
        it('throw error on non array argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.select({});
            }).should.throw('xsql.select: Array argument required');
        });
        it('throw error on empty array', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.select([]);
            }).should.throw('xsql.select: Empty array argument');
        });
        it('select', function () {
            var x = new xsql({dialect:'pg'});
            x.select(['col1','col2']).should.equal('select col1,col2');
        });
    });

    describe('from', function () {
        it('throw error on missing argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.from();
            }).should.throw('xsql.from: Missing argument');
        });
        it('throw error on non string argument', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.from([]);
            }).should.throw('xsql.from: Non string argument');
        });
        it('from', function () {
            var x = new xsql({dialect:'pg'});
            x.from('table').should.equal('from table');
        });
    });
});
