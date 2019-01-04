
var should = require('should');
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
        it('schema.table.colums', function () {
            var x = new xsql({dialect:'pg'});
            x.names(['col1','col2'],'tbl','schema')
                .should.equal('"schema"."tbl"."col1","schema"."tbl"."col2"');
        });
    });

    describe('schema', function () {
        it('undefined on non pg dialect', function () {
            var x = new xsql({dialect:'mysql'});
            should.equal(x.schema(), undefined);
            should.equal(x.schema('x'), undefined);
        });
        it('public schema by default', function () {
            var x = new xsql({dialect:'pg'});
            x.schema().should.equal('public');
        });
        it('globally defined schema', function () {
            var x = new xsql({dialect:'pg', schema:'x'});
            x.schema().should.equal('x');
        });
        it('specify schema', function () {
            var x = new xsql({dialect:'pg', schema:'x'});
            x.schema('y').should.equal('y');
        });
    });

    describe('as', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('column as name', function () {
            x.as('column', 'name').should.equal('column as name');
        });
    });

    describe('alias', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('table name', function () {
            x.alias('table', 'name').should.equal('table name');
        });
    });

    describe('func', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string function argument', function () {
            x.func('func', 'arg').should.equal('func(arg)');
        });
        it('array function arguments', function () {
            x.func('func', ['arg1','arg2']).should.equal('func(arg1,arg2)');
        });
        it('specify argument separator', function () {
            x.func('func', ['arg1','arg2'],' ').should.equal('func(arg1 arg2)');
        });
    });

    describe('select', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('select string', function () {
            x.select('col1').should.equal('select col1');
        });
        it('select array', function () {
            x.select(['col1','col2']).should.equal('select col1,col2');
        });
    });

    describe('from', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('from', function () {
            x.from('table').should.equal('from table');
        });
    });

    describe('join', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('join string', function () {
            x.join('tbl','expr').should.equal('join tbl on expr');
        });
        it('join array', function () {
            x.join('tbl',['expr1','expr2']).should.equal('join tbl on expr1 and expr2');
        });
        it('join type', function () {
            x.join('tbl','expr','left').should.equal('left join tbl on expr');
        });
    });

    describe('eq', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('eq', function () {
            x.eq('a','b').should.equal('a=b');
        });
    });

    describe('eqv', function () {
        var x; before(function () {x = new xsql({dialect:'mysql'})});
        it('undefined', function () {
            x.eqv('col',undefined).should.equal('col=null');
        });
        it('null', function () {
            x.eqv('col',null).should.equal('col=null');
        });
        it('string', function () {
            x.eqv('col','v\'a"l"').should.equal("col='v''a\"l\"'");
        });
        it('boolean', function () {
            x.eqv('col',false).should.equal('col=0');
            x.eqv('col',true).should.equal('col=1');
        });
        it('boolean pg', function () {
            x = new xsql({dialect:'pg'});
            x.eqv('col',false).should.equal("col='f'");
            x.eqv('col',true).should.equal("col='t'");
        });
    });

    describe('groupby', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('group by string', function () {
            x.groupby('col').should.equal('group by col');
        });
        it('group by array', function () {
            x.groupby(['col1','col2']).should.equal('group by col1,col2');
        });
    });

    describe('orderby', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('order by string', function () {
            x.orderby('col').should.equal('order by col');
        });
        it('order by string and set order', function () {
            x.orderby('col','desc').should.equal('order by col desc');
        });
        it('order by array', function () {
            x.orderby(['col1','col2'])
                .should.equal('order by col1,col2');
        });
        it('order by array and set order', function () {
            x.orderby(['col1','col2'],'desc')
                .should.equal('order by col1 desc,col2 desc');
        });
        it('order by object', function () {
            x.orderby({col:'asc'})
                .should.equal('order by col asc');
        });
        it('order by array of object', function () {
            x.orderby([{col1:'asc'},{col2:'desc'}])
                .should.equal('order by col1 asc,col2 desc');
        });
        it('order by mixed array of strings and objects', function () {
            x.orderby(['col1',{col2:'asc'}])
                .should.equal('order by col1,col2 asc');
        });
        it('order by mixed array of strings and objects and set default order', function () {
            x.orderby(['col1',{col2:'asc'}],'desc')
                .should.equal('order by col1 desc,col2 asc');
        });
    });

    describe('limit', function () {
        it('limit', function () {
            var x = new xsql({dialect:'mysql'});
            x.limit(1,2).should.equal('limit 1,2')
        });
        it('limit pg', function () {
            var x = new xsql({dialect:'pg'});
            x.limit(1,2).should.equal('limit 2 offset 1')
        });
    });

    describe('in', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('number argument', function () {
            x.in(1).should.equal('in(1)');
        });
        it('string argument', function () {
            x.in('a').should.equal("in('a')");
        });
        it('array argument', function () {
            x.in([1,'a']).should.equal("in(1,'a')");
        });
    });

    describe('and', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.and('expr').should.equal('and expr');
        });
        it('array', function () {
            x.and(['expr1','expr2']).should.equal('expr1 and expr2');
        });
    });

    describe('or', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.or('expr').should.equal('or expr');
        });
        it('array', function () {
            x.or(['expr1','expr2']).should.equal('expr1 or expr2');
        });
    });

    describe('between', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string and number', function () {
            x.between('a',1).should.equal('between a and 1');
        });
        it('number and string', function () {
            x.between(1,'a').should.equal('between 1 and a');
        });
    });

    describe('like', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.like('a').should.equal('like a');
        });
    });

    describe('ilike', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.ilike('a').should.equal('ilike a');
        });
    })

    describe('where', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.where('a=b').should.equal('where a=b');
        });
        it('array', function () {
            x.where(['a=b','c=d']).should.equal('where a=b and c=d');
        });
        it('array and logical operator', function () {
            x.where(['a=b','c=d'],'or').should.equal('where a=b or c=d');
        });
    });

    describe('insert', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.insert('tbl', 'col', 'val')
                .should.equal("insert into tbl (col) values ('val')");
        });
        it('array', function () {
            x.insert('tbl', ['col1','col2'], [1,'str'])
                .should.equal("insert into tbl (col1,col2) values (1,'str')");
        });
        it('escape string values', function () {
            x.insert('tbl', ['col1','col2'], [1,'s\'tr"2"'])
                .should.equal("insert into tbl (col1,col2) values (1,'s''tr\"2\"')");
        });
        it('multiple records', function () {
            x.insert('tbl', ['col1','col2'], [[1,2],['a','b']])
                .should.equal("insert into tbl (col1,col2) values (1,2),('a','b')");
        });
        it('string columns and array values', function () {
            x.insert('tbl', 'col1,col2', [[1,2],['a','b']])
                .should.equal("insert into tbl (col1,col2) values (1,2),('a','b')");
        });
        it('null value', function () {
            x.insert('tbl', 'col1,col2', [1,null])
                .should.equal("insert into tbl (col1,col2) values (1,null)");
        });
        it('do not escape binary strings', function () {
            x.insert('tbl', ['col1','col2'], ["X\'blob\'","\'\\xblob\'"])
                .should.equal("insert into tbl (col1,col2) values (X\'blob\',\'\\xblob\')");
        });
    });

    describe('update', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.update('tbl','col','str').should.equal("update tbl set col='str'");
        });
        it('array', function () {
            x.update('tbl',['col1','col2'],[1,'str'])
                .should.equal("update tbl set col1=1,col2='str'");
        });
        it('escape string values', function () {
            x.update('tbl',['col1','col2'],[1,'s\'tr"2"'])
                .should.equal("update tbl set col1=1,col2='s''tr\"2\"'");
        });
        it('do not escape binary strings', function () {
            x.update('tbl', ['col1','col2'], ["X\'blob\'","\'\\xblob\'"])
                .should.equal("update tbl set col1=X\'blob\',col2=\'\\xblob\'");
        });
    });

    describe('delete', function () {
        var x; before(function () {x = new xsql({dialect:'pg'})});
        it('string', function () {
            x.delete('tbl').should.equal('delete from tbl');
        });
    });
});
