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

    var executeEvent = function(event) {
        var string = event.src,
            element = event.element,
            callback = event.callback;

        if (typeof callback !== "undefined") {
            string = callback.apply(undefined, [this._stack[this._stack.length - 1], element]);
        } else {
            element.innerHTML = ContextStar.stringify(string);
        }
    }

    var stackChangedEvent = function() {
        var self = this;
        this._events.map(function(event) {
            executeEvent.apply(self, [event]);

            return event;
        });
    }

    var ContextStar = {
        _stack: new Array,
        _regex: /#{([^{]*)}/g,
        _events: new Array
    };


    ContextStar.pop = function() {
        if (this._stack.length !== 0) {
            this._stack.pop();
            stackChangedEvent.apply(this);
        }

        return this;
    }

    ContextStar.push = function(object) {
        this._stack.push(object);
        stackChangedEvent.apply(this);

        return this;
    }

    ContextStar.stringify = function(string) {
        var keys = [],
            values = [],
            match;

        while ((match = this._regex.exec(string)) !== null) {
            keys.push(match[1]);
        }

        for (var index in keys) {
            values.push(firstOccurrence(this._stack, keys[index]));
        }

        var i = 0;
        return string.replace(this._regex, function() {
            var v = values[i];
            ++i;
            return v || "";
        });
    }

    ContextStar.bind = function(element, second) {
        if (typeof element === "undefined" || typeof second === "undefined") {
            return; /* TODO error*/
        }

        var event = {};
        event.element = element;

        if (typeof second === "string") {
            event.src = second;
            event.callback = undefined;
        } else if (typeof second === "function") {
            event.src = "";
            event.callback = second;
        }

        this._events.push(event);
        executeEvent.apply(this, [event]);
    }

    window.ContextStar = ContextStar;
})();