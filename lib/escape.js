
var t = require('./typecheck');


// escape string with dialect quotes
function quotes (name) {
    if (this.typecheck) t.typecheck('quotes', [name]);
    return this.quote + name + this.quote;
}

// wrap string with quotes
function wrap (str, quote) {
    if (this.typecheck) t.typecheck('wrap', [str, quote]);
    if (!quote||quote=="'") return "'"+str+"'";
    if (quote == '"') return '"'+str+'"';
    return quote+str+quote;
}

// escape single quotes in string
function escape (str) {
    if (this.typecheck) t.typecheck('escape', [str]);
    return str.replace(/'/g, "''");
}

// escape string quotes and wrap it with quotes
function string (str, quote) {
    if (this.typecheck) t.typecheck('string', [str, quote]);
    return this.wrap(this.escape(str), quote);
}


exports = module.exports = function () {
    this.quotes = quotes;
    this.wrap = wrap;
    this.escape = escape;
    this.string = string;
}
