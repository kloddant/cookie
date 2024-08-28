class Cookie {
	
	static list = [];
	static index = {};
	
	constructor (kwargs={}) {
		this.name = kwargs["name"];
		this.value = kwargs["value"] ?? null;
		console.assert(kwargs.hasOwnProperty('name'));
		console.assert(kwargs.hasOwnProperty('value'));
		let days;
		
		if (kwargs.hasOwnProperty("path")) {
			this.path = kwargs["path"] ?? "/";
		}
		if (kwargs.hasOwnProperty("domain")) {
			this.domain = kwargs["domain"] ?? location.hostname;
		}
		if (kwargs.hasOwnProperty("expires")) {
			this.expires = kwargs["expires"] ?? null;
			console.assert(this.expires instanceof Date || this.expires == null);
		}
		if (kwargs.hasOwnProperty("days")) {
			let days = kwargs["days"] ?? null;
			console.assert(Number.isInteger(days) || days == null);
		}
				
		if (days && !this.expires) {
			this.expires = new Date();
			this.expires.setTime(this.expires.getTime() + (days*24*60*60*1000));
		}
	}
	
	save () {
		let cookie_dict = {};
		cookie_dict[this.name] = this.value || "";
		cookie_dict["Path"] = this.path || "/";
		if (this.domain) {
			cookie_dict["Domain"] = this.domain || location.hostname;
		}
		if (this.expires) {
			cookie_dict["Expires"] = this.expires.toUTCString();
		}
		let cookie_string = "";
		for (const [key, value] of Object.entries(cookie_dict)) {
			cookie_string += key + "=" + value + "; ";
		}
		console.log(cookie_string.trim());
		document.cookie = cookie_string.trim();
		return this;
	}
	
	delete (kwargs={}) {
		if (kwargs.hasOwnProperty("path")) {
			this.path = kwargs["path"];
		}
		if (kwargs.hasOwnProperty("domain")) {
			this.domain = kwargs["domain"];
		}
		this.value = "";
		this.expires = new Date();
		this.expires.setTime(this.expires.getTime() - (24*60*60*1000));
		this.save();
	}
	
	static create (kwargs={}) {
		let cookie = new this(kwargs);
		cookie.save();
		return cookie;
	}
		
	static fetch() {
		let parts = document.cookie.split(";").map((part) => part.trim().split("="));
		this.list = [];
		this.index = {};
		for (let part of parts) {
			let cookie = new this({"name": part[0], "value": part[1]});
			this.list.push(cookie);
			this.index[cookie.name] = cookie;
		}
	}
	
	static all() {
		this.fetch();
		return this.list;
	}
	
	static get(name) {
		this.fetch();
		return this.index[name] ?? null;
	}
	
}
