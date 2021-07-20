(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a4885"],{"079a":function(t,e,i){"use strict";i.r(e),i.d(e,"FilesystemWeb",(function(){return o}));var r=i("1547");class o extends r["a"]{constructor(){super(...arguments),this.DB_VERSION=1,this.DB_NAME="Disc",this._writeCmds=["add","put","delete"]}async initDb(){if(void 0!==this._db)return this._db;if(!("indexedDB"in window))throw this.unavailable("This browser doesn't support IndexedDB");return new Promise((t,e)=>{const i=indexedDB.open(this.DB_NAME,this.DB_VERSION);i.onupgradeneeded=o.doUpgrade,i.onsuccess=()=>{this._db=i.result,t(i.result)},i.onerror=()=>e(i.error),i.onblocked=()=>{console.warn("db blocked")}})}static doUpgrade(t){const e=t.target,i=e.result;switch(t.oldVersion){case 0:case 1:default:{i.objectStoreNames.contains("FileStorage")&&i.deleteObjectStore("FileStorage");const t=i.createObjectStore("FileStorage",{keyPath:"path"});t.createIndex("by_folder","folder")}}}async dbRequest(t,e){const i=-1!==this._writeCmds.indexOf(t)?"readwrite":"readonly";return this.initDb().then(r=>new Promise((o,s)=>{const a=r.transaction(["FileStorage"],i),n=a.objectStore("FileStorage"),d=n[t](...e);d.onsuccess=()=>o(d.result),d.onerror=()=>s(d.error)}))}async dbIndexRequest(t,e,i){const r=-1!==this._writeCmds.indexOf(e)?"readwrite":"readonly";return this.initDb().then(o=>new Promise((s,a)=>{const n=o.transaction(["FileStorage"],r),d=n.objectStore("FileStorage"),c=d.index(t),h=c[e](...i);h.onsuccess=()=>s(h.result),h.onerror=()=>a(h.error)}))}getPath(t,e){const i=void 0!==e?e.replace(/^[/]+|[/]+$/g,""):"";let r="";return void 0!==t&&(r+="/"+t),""!==e&&(r+="/"+i),r}async clear(){const t=await this.initDb(),e=t.transaction(["FileStorage"],"readwrite"),i=e.objectStore("FileStorage");i.clear()}async readFile(t){const e=this.getPath(t.directory,t.path),i=await this.dbRequest("get",[e]);if(void 0===i)throw Error("File does not exist.");return{data:i.content?i.content:""}}async writeFile(t){const e=this.getPath(t.directory,t.path),i=t.data,r=t.recursive,o=await this.dbRequest("get",[e]);if(o&&"directory"===o.type)throw"The supplied path is a directory.";const s=t.encoding,a=e.substr(0,e.lastIndexOf("/")),n=await this.dbRequest("get",[a]);if(void 0===n){const e=a.indexOf("/",1);if(-1!==e){const i=a.substr(e);await this.mkdir({path:i,directory:t.directory,recursive:r})}}const d=Date.now(),c={path:e,folder:a,type:"file",size:i.length,ctime:d,mtime:d,content:!s&&i.indexOf(",")>=0?i.split(",")[1]:i};return await this.dbRequest("put",[c]),{uri:c.path}}async appendFile(t){const e=this.getPath(t.directory,t.path);let i=t.data;const r=e.substr(0,e.lastIndexOf("/")),o=Date.now();let s=o;const a=await this.dbRequest("get",[e]);if(a&&"directory"===a.type)throw"The supplied path is a directory.";const n=await this.dbRequest("get",[r]);if(void 0===n){const e=r.indexOf("/",1);if(-1!==e){const i=r.substr(e);await this.mkdir({path:i,directory:t.directory,recursive:!0})}}void 0!==a&&(i=a.content+i,s=a.ctime);const d={path:e,folder:r,type:"file",size:i.length,ctime:s,mtime:o,content:i};await this.dbRequest("put",[d])}async deleteFile(t){const e=this.getPath(t.directory,t.path),i=await this.dbRequest("get",[e]);if(void 0===i)throw Error("File does not exist.");const r=await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(e)]);if(0!==r.length)throw Error("Folder is not empty.");await this.dbRequest("delete",[e])}async mkdir(t){const e=this.getPath(t.directory,t.path),i=t.recursive,r=e.substr(0,e.lastIndexOf("/")),o=(e.match(/\//g)||[]).length,s=await this.dbRequest("get",[r]),a=await this.dbRequest("get",[e]);if(1===o)throw Error("Cannot create Root directory");if(void 0!==a)throw Error("Current directory does already exist.");if(!i&&2!==o&&void 0===s)throw Error("Parent directory must exist");if(i&&2!==o&&void 0===s){const e=r.substr(r.indexOf("/",1));await this.mkdir({path:e,directory:t.directory,recursive:i})}const n=Date.now(),d={path:e,folder:r,type:"directory",size:0,ctime:n,mtime:n};await this.dbRequest("put",[d])}async rmdir(t){const{path:e,directory:i,recursive:r}=t,o=this.getPath(i,e),s=await this.dbRequest("get",[o]);if(void 0===s)throw Error("Folder does not exist.");if("directory"!==s.type)throw Error("Requested path is not a directory");const a=await this.readdir({path:e,directory:i});if(0!==a.files.length&&!r)throw Error("Folder is not empty");for(const n of a.files){const t=`${e}/${n}`,o=await this.stat({path:t,directory:i});"file"===o.type?await this.deleteFile({path:t,directory:i}):await this.rmdir({path:t,directory:i,recursive:r})}await this.dbRequest("delete",[o])}async readdir(t){const e=this.getPath(t.directory,t.path),i=await this.dbRequest("get",[e]);if(""!==t.path&&void 0===i)throw Error("Folder does not exist.");const r=await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(e)]),o=r.map(t=>t.substring(e.length+1));return{files:o}}async getUri(t){const e=this.getPath(t.directory,t.path);let i=await this.dbRequest("get",[e]);return void 0===i&&(i=await this.dbRequest("get",[e+"/"])),{uri:(null===i||void 0===i?void 0:i.path)||e}}async stat(t){const e=this.getPath(t.directory,t.path);let i=await this.dbRequest("get",[e]);if(void 0===i&&(i=await this.dbRequest("get",[e+"/"])),void 0===i)throw Error("Entry does not exist.");return{type:i.type,size:i.size,ctime:i.ctime,mtime:i.mtime,uri:i.path}}async rename(t){return this._copy(t,!0)}async copy(t){return this._copy(t,!1)}async requestPermissions(){return{publicStorage:"granted"}}async checkPermissions(){return{publicStorage:"granted"}}async _copy(t,e=!1){let{toDirectory:i}=t;const{to:r,from:o,directory:s}=t;if(!r||!o)throw Error("Both to and from must be provided");i||(i=s);const a=this.getPath(s,o),n=this.getPath(i,r);if(a===n)return;if(n.startsWith(a))throw Error("To path cannot contain the from path");let d;try{d=await this.stat({path:r,directory:i})}catch(l){const t=r.split("/");t.pop();const e=t.join("/");if(t.length>0){const t=await this.stat({path:e,directory:i});if("directory"!==t.type)throw new Error("Parent directory of the to path is a file")}}if(d&&"directory"===d.type)throw new Error("Cannot overwrite a directory with a file");const c=await this.stat({path:o,directory:s}),h=async(t,e,r)=>{const o=this.getPath(i,t),s=await this.dbRequest("get",[o]);s.ctime=e,s.mtime=r,await this.dbRequest("put",[s])},y=c.ctime?c.ctime:Date.now();switch(c.type){case"file":{const t=await this.readFile({path:o,directory:s});return e&&await this.deleteFile({path:o,directory:s}),await this.writeFile({path:r,directory:i,data:t.data}),void(e&&await h(r,y,c.mtime))}case"directory":{if(d)throw Error("Cannot move a directory over an existing object");try{await this.mkdir({path:r,directory:i,recursive:!1}),e&&await h(r,y,c.mtime)}catch(l){}const t=(await this.readdir({path:o,directory:s})).files;for(const a of t)await this._copy({from:`${o}/${a}`,to:`${r}/${a}`,directory:s,toDirectory:i},e);e&&await this.rmdir({path:o,directory:s})}}}}o._debug=!0}}]);
//# sourceMappingURL=chunk-2d0a4885.82e8c1a9.js.map