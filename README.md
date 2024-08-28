## Description

This is a library that gives you access to a Cookie class for interacting with cookies in the browser.  
It changes the task of interacting with cookies from one of modifying strings to one of calling methods on objects. 

## Usage

### Creating a Cookie
#### Example
```javascript
var cookie = Cookie.create({"name": "", "value": ""});
```

### Getting an Existing Cookie
#### Example
```javascript
var cookie = Cookie.get("example");
```

### Saving/Updating a Cookie
#### Example
```javascript
cookie.value = 1;
cookie.save();
```

### Deleting a Cookie
#### Example
```javascript
cookie.delete();
```
