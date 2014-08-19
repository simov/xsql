
// escape string with dialect quotes
function quotes (name) {
    if (!name) throw new Error('xsql.quotes: Name parameter required')
    return this.quote + name + this.quote;
}

// wrap string with quotes
function wrap (str, quote) {
    if (!str) throw new Error('xsql.wrap: Missing parameter')
    if (!quote||quote=="'") return "'"+str+"'";
    if (quote == '"') return '"'+str+'"';
    return quote+str+quote;
}

// escape single and double quotes in string
function escape (str) {
    if (!str) throw new Error('xsql.escape: Missing parameter')
    return str.replace(/('|")/g, '\\$1');
}

// escape string quotes and wrap it with quotes
function string (str, quote) {
    if (!str) throw new Error('xsql.string: Missing parameter')
    return this.wrap(this.escape(str, quote));
}


exports = module.exports = function () {
    this.quotes = quotes;
    this.wrap = wrap;
    this.escape = escape;
    this.string = string;
}
