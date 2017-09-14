var Search=angular.module('Search', []);
Search.controller('Searchcontroller',function($scope,$filter){
	$scope.searchOption={
		options:[],
		// dataArr:[]
	};//过滤同种类型里面的模糊找到的内容
	$scope.state='+';
	$scope.show=true;
	$scope.listshow=false;
	$scope.datalistshow=false;
	$scope.type='';//当前查找的种类
	$scope.showTitle='标题';
	$scope.showContent='内容';
	//排序条件
	$scope.order = "-";//默认是升序,-表示降序
	$scope.orderType = "id" ;//以id来排序,不能直接在页面以id这个字段排序

	//更新种类
	function reflash(){
		$scope.categories=[];//种类数组
		for(var key in store.getData()){
			$scope.categories.push(key);
		}
	}
	reflash();

	//点击搜索显示查找显示内容
	$scope.search=function(title){
		$scope.value=title;
		var datalist=$scope.searchOption.options;
		for(var key in datalist){
			if($scope.value == key){
				$scope.showTitle = key;
				$scope.showContent = datalist[key];
			}
		}
		$scope.show=true;

	};
	$scope.hide=function(list){
		$scope.value=list;
		$scope.datalistshow=false;
	}
	//点击左边选择种类获取该种类的所有数据
	$scope.reflash=function(category){
		$scope.value='';
		$scope.listshow=!$scope.listshow;
		$scope.searchOption.options=store.get(category);//某个种类获取到的所有数据
		$scope.type=category;

		log($scope.searchOption.options);
		$scope.lists=[];//列表显示标题的数组
		for(var key in $scope.searchOption.options){
			$scope.lists.push(key);
		}
		log($scope.lists);
	};
	//添加内容时t设置当前内容的种类
	$scope.select=function(category){
		// log(category);
		//查找data 并添加
		$scope.type=category;
	}
	//取到过滤后的数据
	$scope.changeVal=function(){
		// $scope.searchOption.dataArr = $filter('searchfilter')($scope.searchOption.options, $scope.value);
		// log($scope.searchOption.dataArr);
	};
	//添加内容按钮点击
	$scope.addContents=function(){
		store.set($scope.type , $scope.title , $scope.contents);
		$scope.title='';
		$scope.contents='';
		alert("添加成功");
	};
	//添加种类
	$scope.addType=function(){
		store.set($scope.newType);
		$scope.newType='';
		// $scope.categories=store.getData();
		reflash();
	};
	//切换添加/显示内容事件
	$scope.add=function(){
		$scope.show=!$scope.show;
		if($scope.show){
			$scope.state='+';
		}else{
			$scope.state='<';
		}
	};
	//点击删除内容
	$scope.deletelist=function(title,index){
		store.remove($scope.type,title);
		$scope.lists.splice(index,1);
	};
});
// .filter('searchfilter', function(){
// 		return function (obj,str) {
// 			var newArr=[];
// 			angular.forEach(obj,function (option,index) {
// 			//如果option中的名字中包含str,那么就把该option添加到新的数组中
// 				console.log(str);
// 				if(str){
// 					if(index.indexOf(str)!=-1){
// 						newArr.push(index);
// 					}
// 				}
// 			});
// 			return newArr;
// 		}
// });


function log(obj){
	console.log(obj);
}

