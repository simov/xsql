
var xsql = require('../lib/instance');


describe('escape', function () {
    var x = null;
    before(function () {
        x = new xsql({dialect:'pg'});
    });

    describe('quotes', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.quotes();
            }).should.throw('xsql.quotes: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.quotes([]);
            }).should.throw('xsql.quotes: First argument should be string');
        });
    });

    describe('wrap', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.wrap();
            }).should.throw('xsql.wrap: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.wrap([]);
            }).should.throw('xsql.wrap: First argument should be string');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.wrap('str',[]);
            }).should.throw('xsql.wrap: Second argument should be string');
        });
    });

    describe('escape', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.escape();
            }).should.throw('xsql.escape: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.escape([]);
            }).should.throw('xsql.escape: First argument should be string');
        });
    });

    describe('string', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.string();
            }).should.throw('xsql.string: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.string([]);
            }).should.throw('xsql.string: First argument should be string');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.string('str',[]);
            }).should.throw('xsql.string: Second argument should be string');
        });
    });
});


describe('primitive', function () {
    var x = null;
    before(function () {
        x = new xsql({dialect:'pg'});
    });

    describe('name', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.name();
            }).should.throw('xsql.name: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.name([]);
            }).should.throw('xsql.name: First argument should be string');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.name('column',[]);
            }).should.throw('xsql.name: Second argument should be string');
        });
        it('throw error on non string third argument', function () {
            (function () {
                x.name('column','table',[]);
            }).should.throw('xsql.name: Third argument should be string');
        });
    });

    describe('names', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.names();
            }).should.throw('xsql.names: First argument is required');
        });
        it('throw error on non array first argument', function () {
            (function () {
                x.names('column');
            }).should.throw('xsql.names: First argument should be array');
        });
        it('throw error on empty first argument', function () {
            (function () {
                x.names([]);
            }).should.throw('xsql.names: First argument is empty array');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.names(['column'],{});
            }).should.throw('xsql.names: Second argument should be string');
        });
        it('throw error on non string third argument', function () {
            (function () {
                x.names(['column'],'table',[]);
            }).should.throw('xsql.names: Third argument should be string');
        });
    });

    describe('as', function () {
        it('throw error on missing arguments', function () {
            (function () {
                x.as();
            }).should.throw('xsql.as: Both arguments are required');
        });
        it('throw error on missing second argument', function () {
            (function () {
                x.as('column');
            }).should.throw('xsql.as: Both arguments are required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.as([],'name');
            }).should.throw('xsql.as: Both arguments should be strings');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.as('column',{});
            }).should.throw('xsql.as: Both arguments should be strings');
        });
    });

    describe('alias', function () {
        it('throw error on missing arguments', function () {
            (function () {
                x.alias();
            }).should.throw('xsql.alias: Both arguments are required');
        });
        it('throw error on missing second argument', function () {
            (function () {
                x.alias('column');
            }).should.throw('xsql.alias: Both arguments are required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.alias([],'alias');
            }).should.throw('xsql.alias: Both arguments should be strings');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.alias('column',{});
            }).should.throw('xsql.alias: Both arguments should be strings');
        });
    });

    describe('func', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.func('xsql.func: First argument required');
            }).should.throw();
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.func('xsql.func: First argument should be string');
            }).should.throw();
        });
        it('throw error on missing second argument', function () {
            (function () {
                x.func('func');
            }).should.throw('xsql.func: Second argument is required');
        });
        it('throw error on non string or array second argument', function () {
            (function () {
                x.func('func',{});
            }).should.throw('xsql.func: Second argument should be string or array');
        });
        it('throw error on empty second argument', function () {
            (function () {
                x.func('func',[]);
            }).should.throw('xsql.func: Second argument is empty array');
        });
        it('throw error on non string third argument', function () {
            (function () {
                x.func('func',['arg1'],[]);
            }).should.throw('xsql.func: Third argument should be string');
        });
    });

    describe('select', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.select();
            }).should.throw('xsql.select: First argument is required');
        });
        it('throw error on non string or array first argument', function () {
            (function () {
                x.select({});
            }).should.throw('xsql.select: First argument should be string or array');
        });
        it('throw error on empty first argument', function () {
            (function () {
                x.select([]);
            }).should.throw('xsql.select: First argument is empty array');
        });
    });

    describe('from', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.from();
            }).should.throw('xsql.from: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.from([]);
            }).should.throw('xsql.from: First argument should be string');
        });
    });

    describe('join', function () {
        it('throw error on missing first argument', function () {
            (function () {
                x.join();
            }).should.throw('xsql.join: First argument is required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.join([]);
            }).should.throw('xsql.join: First argument should be string');
        });
        it('throw error on missing second argument', function () {
            (function () {
                x.join('tbl');
            }).should.throw('xsql.join: Second argument is required');
        });
        it('throw error on non string or array second argument', function () {
            (function () {
                x.join('tbl',{});
            }).should.throw('xsql.join: Second argument should be string or array');
        });
        it('throw error on empty second argument', function () {
            (function () {
                x.join('tbl',[]);
            }).should.throw('xsql.join: Second argument is empty array');
        });
        it('throw error on non string third argument', function () {
            (function () {
                x.join('tbl','expr',{});
            }).should.throw('xsql.join: Third argument should be string');
        });
    });

    describe('eq', function () {
        it('throw error on missing arguments', function () {
            (function () {
                x.eq();
            }).should.throw('xsql.eq: Both arguments are required');
        });
        it('throw error on missing second argument', function () {
            (function () {
                x.eq('a');
            }).should.throw('xsql.eq: Both arguments are required');
        });
        it('throw error on non string first argument', function () {
            (function () {
                x.eq([],'b');
            }).should.throw('xsql.eq: Both arguments should be strings');
        });
        it('throw error on non string second argument', function () {
            (function () {
                x.eq('a',{});
            }).should.throw('xsql.eq: Both arguments should be strings');
        });
    });
});
