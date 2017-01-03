//一个用于简化其他“类”创建的基“类”

//定义一个名为Class的对象，该对象有一个create()方法用于创建新的类。我们用闭包来维护内部函数，避免公开暴露这些函数
var Class=(function(){
	//调用create()方法时，它将根据一个对象直接量来定义并返回一个新的“类”，该对象直接量为这个“类”的原型提供了各种
	//公有属性和方法。一个名为initialize()的方法将被作为构造函数来执行。如果代表父“类”的可选参数parentPrototype
	//被传入，则新创建的“类”将成为该父“类”的子类
	function create(classDefinition,parentPrototype){
		//定义新“类”的构造函数，如果classDefinition对象直接量包含initialize()方法，则在构造函数中使用该方法
		var _NewClass=function(){
			if(this.initialize&&typeof this.initialize ==='function'){
				this.initialize.apply(this,arguments);
			}
		},_name;
		
		//（在继承其他类时）如果传入了一个parentPrototype对象，则子类将继承parentPrototype的所有属性和方法
		
		if(parentPrototype){
			_NewClass.prototype=new parentPrototype.constructor();
			
			for(_name in parentPrototype){
				if(parentPrototype.hasOwnProperty(_name)){
					_NewClass.prototype[_name]=parentPrototype[_name];
				}
			}
		}
		
		//通过定义一个函数来创建闭包，然后在闭包中返回另一个函数来替代传入的函数
		//将传入的函数包装起来，并为当前对象提供一个_praent()方法，以支持对父“类”中同名方法的访问，这样就实现了对多态的支持
		function polymorph(thisFunction,parentFunction){
			return function(){
				var output;
				
				this._parent=parentFunction;
				output=thisFunction.apply(this,arguments);
				delete this._parent;
				return output;
			};
		}
		
		//将作为参数传入的“类”定义应用到新创建的“类”上，覆盖所有parentPrototype中已存在的属性和方法
		for(_name in classDefinition){
			if(classDefinition.hasOwnProperty(_name)){
				//如果正在利用多态，即创建和父“类”方法同名的新方法，我们希望提供一种在子类方法中调用父“类”同名的方法的简单方式
				if(parentPrototype&&parentPrototype[_name]&&typeof classDefinition[_name]==='function'){
					_NewClass.prototype[_name]=polymorph(classDefinition[_name],parentPrototype[_name]);
				}
				else{
					//如果不需要多态，则直接将classDefinition对象直接量中的项映射到新“类”的原型即可
					_NewClass.prototype[_name]=classDefinition[_name];
				}
			}
		}
		
		//确保构造函数属性设置正确，不管是否继承
		//（以防classDefinition对象直接量包含名为constructor的属性或方法）
		_NewClass.prototype.constructor=_NewClass;
		
		//为新创建的“类”自身定义一个extend()方法，指向私有的extend()函数，这个函数定义在下面，
		//我们通过此方法可以讲当前“类”作为父“类”来创建一个子“类”
		_NewClass.extend=extend;
		
		return _NewClass;
	}
	
	//extend()与create()方法相同，不过隐含了一个额外的参数，即用来进行继承的父“类”的原型
	function extend(classDefinition){
		return create(classDefinition,this.prototype);
	}
	
	//用相同的名字将私有的create()方法暴露
	return{
		create:create
	};
}());


//“类”创建器的实际使用

//通过Class.create定义一个“类”，传入一个对象直接量，该对象包含那些将为新“类”所拥有的公有属性和方法。initialize方法将成为新“类”的构造函数
var Accommodation =Class.create({
	isLocked: true,
	isAlarmed:true,
	lock:function(){
		this.isLocked=true;
	},
	unlock:function(){
		this.unlock();
	}
});

//Class.create在创建的所有“类”上添加了一个extend方法，我们使用该方法来创建Accommodation的子类，以实现简单的继承。
//父“类”的所有公有方法和属性对子类都可用，如果同名则覆盖父类
var House=Accommodation.extend({
	floors:2,
	lock:function(){
	//虽然正在用多态来替代父“类”中的同名方法，仍可通过this.parent访问被替代的父“类”方法
		this._parent();
		alert("Number of floors locked:"+this.floors);
	}
});

//创建新“类”的对象实例
var myAccommodation =new Accommodation();
alert(myAccommodation instanceof Accommodation); //true
alert(myAccommodation instanceof House); //false

var myHouse=new House();
alert(myHouse.isLocked); //false (由负“类”的initialize方法所设置，该方法被House继承)
myHouse.lock(); //弹出警告消息“Number of floors locked：2”
alert(myHouse.isLocked); //true
alert(myHouse instanceof House); //true
alert(myHouse instanceof Accommodation); //true
