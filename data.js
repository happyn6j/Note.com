var store={
	 __data_key: '__data_key_',
    get: function (id) {
        var datas = this.getData();
        return datas[id] || {};
    },
    set: function (id,title, content) {
        var datas = this.getData();
        if (datas[id]) {
        	//存在
        	if(datas[id][title]){
            	Object.assign(datas[id][title], content);
        	}else{
            	datas[id][title] = content;
        	}
        } else {
            //加载一个新的文档
            datas[id]={};
        }
        console.log(datas);
        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
        localStorage[this.__data_key] = JSON.stringify(datas);
        console.log('save data! id:'+id+' title:'+JSON.stringify(title))
    },
    remove:function(id,...rest){
        var datas = this.getData();
        console.log(rest[0]);
        console.log(datas[id]);
        if(rest.length<=0){
        	delete datas[id];
        }else{
        	delete datas[id][rest[0]];
        }
        localStorage[this.__data_key] = JSON.stringify(datas);
    },
    getData: function(){
    	return JSON.parse(localStorage[this.__data_key]|| '{}');
    }

}
 // localStorage.clear();