
var xsql = require('../lib/instance');


describe('examples', function () {
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
});
