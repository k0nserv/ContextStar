ContextStar
===========

Javascript context sensitive strings. 

Usage
===========
ContextStar let's you create context sensitive strings by using a special syntax.

First add `ContextStar.js` to your document.

```
	var stringSource = "#{name} likes to drink #{drink} on the #{porch}!";
	
	/* ContextStar uses a global context stack to specify information */
	/* Here we push some information on to the stack */
    ContextStar.push({
		name 	: "Paul",
		drink	: "beer",
		place  	: "porch" 
	});
	
	console.log(ContextStar.stringify(stringSource));
	
```

This will print `Paul likes to drink beer on the porch!` to the console.

###More stack level

```
	ContextStar.push({
		drink : "juice",
		place : "beach"
	});
	
	console.log(ContextStar.stringify(stringSource));
```

This will print `Paul likes to drink juice on the beach!` to the console.

Because we have defined two stack levels ContextStar will use the top of the stack when ever possible, how ever if something is not defined on the top stack level it will look further down the stack.


###Poping the stack
Poping the stack works like you'd suspect

```
	ContextStar.pop();
	
	console.log(ContextStar.stringify(stringSource));
```

This will once again print `Paul likes to drink beer on the porch!` to the console.

###Binding Events
Values can be bound to certain DOM elements and will be updated accordingly when the context is pushed or popped.

**Example:**

```
    var someElement = document.getElementById("welcomeHeader");

    ContextStar.bind(someElement, "Welcome #{name}!");
```

**You can also use callbacks**

```

    ContextStar.bind(someElement, function(stackTop) {
        console.log(stackTop);//The most recent stackframe added

        //Be mindful when using this as the stackTop might not have defined the property name
        return "Hello there "+ stackTop.name;
    });
```

*For a more detailed example checkout index.html*

License
=======

MIT Licensed
	