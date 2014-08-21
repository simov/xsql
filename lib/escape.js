
var error = require('./error');


// escape string with dialect quotes
function quotes (name) {
    if (this.typecheck) error.typecheck('quotes', [name]);
    return this.quote + name + this.quote;
}

// wrap string with quotes
function wrap (str, quote) {
    if (this.typecheck) error.typecheck('wrap', [str, quote]);
    if (!quote||quote=="'") return "'"+str+"'";
    if (quote == '"') return '"'+str+'"';
    return quote+str+quote;
}

// escape single and double quotes in string
function escape (str) {
    if (this.typecheck) error.typecheck('escape', [str]);
    return str.replace(/('|")/g, '\\$1');
}

// escape string quotes and wrap it with quotes
function string (str, quote) {
    if (this.typecheck) error.typecheck('string', [str, quote]);
    return this.wrap(this.escape(str, quote));
}


exports = module.exports = function () {
    this.quotes = quotes;
    this.wrap = wrap;
    this.escape = escape;
    this.string = string;
}
