
var xsql = require('../../lib/instance');


describe('readme', function () {
    it('example 1', function () {
        var x = new xsql({dialect:'mysql'});
        var query = [
            x.select(x.names(['col1','col2'],'tbl')),
            x.from(x.name('tbl')),
            x.where(x.eq(x.name('id','tbl'),2)), ';'
        ].join(' ');
        console.log(query);
    });
    it('join tables', function () {
        var x = new xsql({dialect:'mysql'});
        var query = [
            x.select([x.name('col','tbl1'),x.name('col','tbl2')]),
            x.from(x.name('tbl1')),
            x.join(x.name('tbl2'),x.eq(x.name('id','tbl1'),x.name('id','tbl2')),'left'),
            ';'
        ].join(' ');
        console.log(query);
    });
    describe('pg schema', function () {
        it('public', function () {
            var x = new xsql({dialect:'pg'});
            var query = [
                x.select(x.name('col','tbl',x.schema())),
                x.from(x.name('tbl',x.schema())),
                ';'
            ].join(' ');
            console.log(query);
        });
    });
    it('functions', function () {
        var x = new xsql({dialect:'mysql'});

        var concat = x.func('concat_ws',[
            x.wrap(' '),
            x.name('col1','tbl'),
            x.name('col2','tbl')
        ]);

        var group = x.func('group_concat',['distinct', concat],' ');

        console.log(x.as(group,x.name('alias')));

        // group_concat(distinct concat_ws(' ',`tbl`.`col1`,`tbl`.`col2`)) as `alias`
    });
    describe('wrapping', function () {
        it('concat', function () {
            function concat(columns, separator) {
                return (/mysql|pg/.test(x.dialect))
                    ? x.func('concat_ws',[x.wrap(separator),columns])
                    // sqlite
                    : columns.join("||'"+separator+"'||");
            }
            var x = new xsql({dialect:'mysql'});
            var partial = concat([x.name('col1','tbl'), x.name('col2','tbl')],',');
            console.log(partial);
            var x = new xsql({dialect:'sqlite'});
            var partial = concat([x.name('col1','tbl'), x.name('col2','tbl')],',');
            console.log(partial);
        });
        it('group', function () {
            function group (columns) {
                return (/mysql|sqlite/.test(x.dialect))
                    ? x.func('group_concat',['distinct',columns],' ')
                    // pg
                    : x.func('string_agg',['distinct',[columns,x.wrap(',')].join()],' ')
            }
            var x = new xsql({dialect:'mysql'});
            var partial = group([x.name('col1','tbl'), x.name('col2','tbl')],',');
            console.log(partial);
            var x = new xsql({dialect:'pg'});
            var partial = group([x.name('col1','tbl'), x.name('col2','tbl')],',');
            console.log(partial);
        });
    });
});

describe.skip('examples', function () {
    describe('concat_ws', function () {
        it('concat_ws', function () {
            var x = new xsql({dialect:'mysql'});
            x.func('concat_ws', [x.wrap(','),'col1','col2'])
                .should.equal("concat_ws(',',col1,col2)");
        });
        it('concat_ws', function () {
            var x = new xsql({dialect:'mysql'});
            x.func('concat_ws', [x.wrap(','),x.name('col1'),x.name('col2')])
                .should.equal("concat_ws(',',`col1`,`col2`)");
        });
        it('concat_ws', function () {
            var x = new xsql({dialect:'mysql'});
            x.func('concat_ws', [x.wrap(','),x.name('col1','tbl'),x.name('col2','tbl')])
                .should.equal("concat_ws(',',`tbl`.`col1`,`tbl`.`col2`)");
        });
        it('concat_ws', function () {
            var x = new xsql({dialect:'mysql'});
            x.func('concat_ws', [x.wrap(','),x.names(['col1','col2'],'tbl')])
                .should.equal("concat_ws(',',`tbl`.`col1`,`tbl`.`col2`)");
        });
        it('concat_ws', function () {
            var x = new xsql({dialect:'mysql'});
            x.as(x.func('concat_ws', [x.wrap(','),x.names(['col1','col2'],'tbl')]),x.name('name'))
                .should.equal("concat_ws(',',`tbl`.`col1`,`tbl`.`col2`) as `name`");
        });
    });
    
    describe('group_concat', function () {
        it('group_concat', function () {
            var x = new xsql({dialect:'mysql'});
            var str =
            x.as(
                x.func('group_concat',[
                    'distinct',
                    x.func('concat_ws', [
                        x.wrap(' '),
                        x.func('cast', [x.as(x.name('tbl1','col1'),'char')],' '),
                        x.func('cast', [x.as(x.name('tbl1','col2'),'char')],' ')
                    ])
                ],' '),
                x.name('name')
            );

            str.should.equal(
                "group_concat(distinct concat_ws(' ',cast(`col1`.`tbl1` as char),cast(`col2`.`tbl1` as char))) as `name`"
            );
        });
        it('group_concat', function () {
            var x = new xsql({dialect:'mysql'});

            var concat = [
                x.wrap(' '),
                x.func('cast', [x.as(x.name('tbl1','col1'),'char')],' '),
                x.func('cast', [x.as(x.name('tbl1','col2'),'char')],' ')
            ];

            var group = ['distinct',x.func('concat_ws',concat)];

            var str = x.as(x.func('group_concat', group,' '),x.name('name'));

            str.should.equal(
                "group_concat(distinct concat_ws(' ',cast(`col1`.`tbl1` as char),cast(`col2`.`tbl1` as char))) as `name`"
            );
        });
    });

    describe('select from', function () {
        it('select from', function () {
            var x = new xsql({dialect:'mysql'});

            var concat = [
                x.wrap(' '),
                x.func('cast', [x.as(x.name('tbl1','col1'),'char')],' '),
                x.func('cast', [x.as(x.name('tbl1','col2'),'char')],' ')
            ];

            var group = ['distinct',x.func('concat_ws',concat)];

            var column = x.as(x.func('group_concat', group,' '),x.name('name'));

            [x.select(column), x.from(x.name('tbl'))].join(' ').should.equal(
                "select group_concat(distinct concat_ws(' ',cast(`col1`.`tbl1` as char),cast(`col2`.`tbl1` as char))) as `name` from `tbl`"
            );
        });
    });

    describe('join', function () {
        it('join', function () {
            var x = new xsql({dialect:'mysql'});

            var query = [
                x.select(
                    (function columns () {
                        var concat = [
                            x.wrap(' '),
                            x.func('cast', x.as(x.name('col1','tbl1'),'char')),
                            x.func('cast', x.as(x.name('col2','tbl1'),'char'))
                        ];

                        var group = ['distinct',x.func('concat_ws',concat)];

                        return x.as(x.func('group_concat', group,' '),x.name('name'));
                    }())
                ),

                x.from(x.name('tbl')),

                x.join(
                    x.alias(x.name('tbl'),x.name('tbl22')),
                    [
                        x.eq(x.name('col','tbl'), x.name('col','tbl')),
                        x.eq(x.name('col','tbl'), x.name('col','tbl'))
                    ],
                    'left'
                )
            ];

            query.join(' ').should.equal(
                "select group_concat(distinct concat_ws(' ',cast(`tbl1`.`col1` as char),cast(`tbl1`.`col2` as char))) as `name` from `tbl` "+
                "left join `tbl` `tbl22` on `tbl`.`col` = `tbl`.`col` and `tbl`.`col` = `tbl`.`col`"
            );
        });
    });
});
