
var xsql = require('../lib/instance');


describe('quotes', function () {
    describe('quotes', function () {
        it('throw error on missing name parameter', function () {
            (function () {
                var x = new xsql({dialect:'mysql'});
                x.quotes();
            }).should.throw('xsql.quotes: Name parameter required');
        });
        it('mysql', function () {
            var x = new xsql({dialect:'mysql'});
            x.quotes('name').should.equal('`name`');
        });
        it('sqlite', function () {
            var x = new xsql({dialect:'sqlite'});
            x.quotes('name').should.equal('"name"');
        });
        it('pg', function () {
            var x = new xsql({dialect:'pg'});
            x.quotes('name').should.equal('"name"');
        });
    });

    describe('wrap', function () {
        it('throw error on missing parameter', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.wrap();
            }).should.throw('xsql.wrap: Missing parameter');
        });
        it('single quote by default', function () {
            var x = new xsql({dialect:'pg'});
            x.wrap('str').should.equal("'str'");
        });
        it('specify single quote', function () {
            var x = new xsql({dialect:'pg'});
            x.wrap('str',"'").should.equal("'str'");
        });
        it('specify double quote', function () {
            var x = new xsql({dialect:'pg'});
            x.wrap('str','"').should.equal('"str"');
        });
        it('specify quote', function () {
            var x = new xsql({dialect:'pg'});
            x.wrap('str','`').should.equal('`str`');
        });
    });

    describe('escape', function () {
        it('throw error on missing parameter', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.escape();
            }).should.throw('xsql.escape: Missing parameter');
        });
        it('escape single quotes', function () {
            var x = new xsql({dialect:'pg'});
            x.escape("that's true").should.equal("that\\'s true");
        });
        it('escape double quotes', function () {
            var x = new xsql({dialect:'pg'});
            x.escape('my "name" quoted').should.equal('my \\"name\\" quoted');
        });
    });

    describe('string', function () {
        it('throw error on missing parameter', function () {
            (function () {
                var x = new xsql({dialect:'pg'});
                x.string();
            }).should.throw('xsql.string: Missing parameter');
        });
        it('escape single quotes', function () {
            var x = new xsql({dialect:'pg'});
            x.string("that's true").should.equal("'that\\'s true'");
        });
        it('escape double quotes', function () {
            var x = new xsql({dialect:'pg'});
            x.string('my "name" quoted').should.equal('\'my \\"name\\" quoted\'');
        });
    });
});
