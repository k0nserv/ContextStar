(function() {
    "use strict";

    var firstOccurrence = function(stack, property) {
        for (var i = stack.length - 1; i >= 0; --i) {
            if (typeof stack[i][property] !== "undefined") {
                return stack[i][property];
            }
        }

        return undefined;
    }


    var ContextStar = {
        _stack : new Array,
        _regex : /#{([^{]*)}/g,

        pop : function() {
            this._stack.pop();

            return this;
        },

        push : function(object) {
            this._stack.push(object);

            return this;
        },

        stringify : function(string) {
            var keys    = [],
                values  = [], 
                match;

            while ((match = this._regex.exec(string)) !== null) {
                keys.push(match[1]);
            }

            for (var index in keys) {
                values.push(firstOccurrence(this._stack, keys[index]));
            }

            var i = 0;
            return string.replace(this._regex, function() {
                var v = values[i]; ++i;
                return v || "";
            });
        }
    };

    window.ContextStar = ContextStar;
})();