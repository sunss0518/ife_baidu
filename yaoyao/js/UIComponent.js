// 浮出层
// 组件开始---------------------------------------------------------------
(function() {
	function FloatingLayer(poster) {
  	this.fl = poster;
  	this.determine = document.getElementById("determine");
  	this.cancel = document.getElementById("cancel");
  	this.mask = document.getElementById("mask");
  	this.showBtn = document.getElementById("btn");
  }
	FloatingLayer.prototype = {
		closeFL: function() {
			var fl = this.fl;
			var mask = this.mask;
			function dis() {
				fl.style.display = "none";
				mask.style.display = "none";
			}
			this.determine.addEventListener("click", dis);
			this.cancel.addEventListener("click", dis);
			this.mask.addEventListener("click", dis);
		},
	  openFL: function() {
	  	var fl = this.fl;
	  	var mask = this.mask;
	  	this.showBtn.addEventListener("click", function() {
	  		fl.style.display = "block";
	  		mask.style.display = "block";
	  	});
	  }
	}
	FloatingLayer.init = function(poster) {
		new this(poster);
	};
	window["FloatingLayer"] = FloatingLayer;
})();
// 组件结束---------------------------------------------------------------


// 排序表格
// 组件开始---------------------------------------------------------------
(function() {
	function SortTable(poster,data) {
		this.poster = poster;
		this.thead = document.getElementById("thead");
		this.tbody = document.getElementById("tbody");
		this.data = JSON.parse(data);
		this.setData();
		this.ascending();
		this.descending();
	}
	SortTable.prototype = {
		setData: function() {
			var trHead = document.createElement("tr");
			this.thead.appendChild(trHead);
			var idxT = 0;
			var idxB = 0;
			for (var z in this.data[0]) {
				var th = document.createElement("th");
			  var thText = document.createTextNode(z);
			  if (this.data[0][z] == true) {
			  	var divT = document.createElement("div");
			  	var divB = document.createElement("div");
			  	divT.className = "sort-icon-top";
			  	divB.className = "sort-icon-bottom";
			  	divT.id = "asc-" + (idxT++);
			  	divB.id = "des-" + (idxB++);
			  	th.appendChild(divT);
			  	th.appendChild(divB);
			  }
			  th.appendChild(thText);
			  trHead.appendChild(th);
			}
			for (var i = 1; i < data.length; i++) {
				var trBody = document.createElement("tr");
			  this.tbody.appendChild(trBody);
			  for (var j in this.data[i]) {
			  	var td = document.createElement("td");
			    var tdText = document.createTextNode(this.data[i][j]);
			    td.appendChild(tdText);
			    trBody.appendChild(td);
			  }
			}
		},
		ascending: function() {
			var data = this.data;
			var tbody = this.tbody;
			this.thead.addEventListener("click", function(event) {
				var target = event.target;
				if (target.className == "sort-icon-top") {
			    asc(target);
				}
			});
		},
		descending: function() {
			var data = this.data;
			var tbody = this.tbody;
			this.thead.addEventListener("click", function(event) {
				var target = event.target;
				if (target.className == "sort-icon-bottom") {
			    asc(target);
				}
			});
		}
	};

	SortTable.init = function(poster,json) {
		new this(poster,json);
	};

	window["SortTable"] = SortTable;

	function asc(target) {
				var keyArr = [];
				for (var w in data[0]) {
					keyArr.push(w);
				}
				var arr = keyArr.filter(function(val) {
					return data[0][val] == true;
				});
				var idx = target.id.indexOf("-");
				var key = arr[target.id.slice(idx+1)];
				for (var i = 1; i < data.length - 1; i++) {
			  	for (var j = data.length - 1; j > i; j--) {
			  		switch(target.className) {
			  			case "sort-icon-top":
			  			  if (data[j][key] < data[j-1][key]) {
			  		    	var temp = data[j-1];
			  		    	data[j-1] = data[j];
			  		    	data[j] = temp;
			  		    }
			  		    break;
			  		  case "sort-icon-bottom":
			  		    if (data[j][key] > data[j-1][key]) {
			  		    	var temp = data[j-1];
			  		    	data[j-1] = data[j];
			  		    	data[j] = temp;
			  		    }
			  		    break;
			  		}
			  	}
			  }
			  var tr = tbody.getElementsByTagName("tr");
			  for (var m = 0; m < tr.length; m++) {
			  	var td = tr[m].getElementsByTagName("td");
			  	for (var n = 0; n < td.length; n++) {
			  		for (var k in data[0]) {
			  			td[n].innerHTML = data[m+1][keyArr[n]];
			  		}
			  	}
			  }
			}
})();
// 组件结束---------------------------------------------------------------