
var xsql = require('../lib/instance');


describe('primitive', function () {
    describe('name', function () {
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
        it('column as name', function () {
            var x = new xsql({dialect:'pg'});
            x.as('column', 'name').should.equal('column as name');
        });
    });

    describe('alias', function () {
        it('table name', function () {
            var x = new xsql({dialect:'pg'});
            x.alias('table', 'name').should.equal('table "name"');
        });
    });

    describe('func', function () {
        it('string function argument', function () {
            var x = new xsql({dialect:'pg'});
            x.func('func', 'arg').should.equal('func(arg)');
        });
        it('array function arguments', function () {
            var x = new xsql({dialect:'pg'});
            x.func('func', ['arg1','arg2']).should.equal('func(arg1,arg2)');
        });
        it('specify argument separator', function () {
            var x = new xsql({dialect:'pg'});
            x.func('func', ['arg1','arg2'],' ').should.equal('func(arg1 arg2)');
        });
    });

    describe('select', function () {
        it('select string', function () {
            var x = new xsql({dialect:'pg'});
            x.select('col1').should.equal('select col1');
        });
        it('select array', function () {
            var x = new xsql({dialect:'pg'});
            x.select(['col1','col2']).should.equal('select col1,col2');
        });
    });

    describe('from', function () {
        it('from', function () {
            var x = new xsql({dialect:'pg'});
            x.from('table').should.equal('from table');
        });
    });

    describe('join', function () {
        it('join string', function () {
            var x = new xsql({dialect:'pg'});
            x.join('tbl','expr').should.equal('join tbl on expr');
        });
        it('join array', function () {
            var x = new xsql({dialect:'pg'});
            x.join('tbl',['expr1','expr2']).should.equal('join tbl on expr1 and expr2');
        });
        it('join type', function () {
            var x = new xsql({dialect:'pg'});
            x.join('tbl','expr','left').should.equal('left join tbl on expr');
        });
    });
});
