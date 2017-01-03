//һ�����ڼ��������ࡱ�����Ļ����ࡱ

//����һ����ΪClass�Ķ��󣬸ö�����һ��create()�������ڴ����µ��ࡣ�����ñհ���ά���ڲ����������⹫����¶��Щ����
var Class=(function(){
	//����create()����ʱ����������һ������ֱ���������岢����һ���µġ��ࡱ���ö���ֱ����Ϊ������ࡱ��ԭ���ṩ�˸���
	//�������Ժͷ�����һ����Ϊinitialize()�ķ���������Ϊ���캯����ִ�С�����������ࡱ�Ŀ�ѡ����parentPrototype
	//�����룬���´����ġ��ࡱ����Ϊ�ø����ࡱ������
	function create(classDefinition,parentPrototype){
		//�����¡��ࡱ�Ĺ��캯�������classDefinition����ֱ��������initialize()���������ڹ��캯����ʹ�ø÷���
		var _NewClass=function(){
			if(this.initialize&&typeof this.initialize ==='function'){
				this.initialize.apply(this,arguments);
			}
		},_name;
		
		//���ڼ̳�������ʱ�����������һ��parentPrototype���������ཫ�̳�parentPrototype���������Ժͷ���
		
		if(parentPrototype){
			_NewClass.prototype=new parentPrototype.constructor();
			
			for(_name in parentPrototype){
				if(parentPrototype.hasOwnProperty(_name)){
					_NewClass.prototype[_name]=parentPrototype[_name];
				}
			}
		}
		
		//ͨ������һ�������������հ���Ȼ���ڱհ��з�����һ���������������ĺ���
		//������ĺ�����װ��������Ϊ��ǰ�����ṩһ��_praent()��������֧�ֶԸ����ࡱ��ͬ�������ķ��ʣ�������ʵ���˶Զ�̬��֧��
		function polymorph(thisFunction,parentFunction){
			return function(){
				var output;
				
				this._parent=parentFunction;
				output=thisFunction.apply(this,arguments);
				delete this._parent;
				return output;
			};
		}
		
		//����Ϊ��������ġ��ࡱ����Ӧ�õ��´����ġ��ࡱ�ϣ���������parentPrototype���Ѵ��ڵ����Ժͷ���
		for(_name in classDefinition){
			if(classDefinition.hasOwnProperty(_name)){
				//����������ö�̬���������͸����ࡱ����ͬ�����·���������ϣ���ṩһ�������෽���е��ø����ࡱͬ���ķ����ļ򵥷�ʽ
				if(parentPrototype&&parentPrototype[_name]&&typeof classDefinition[_name]==='function'){
					_NewClass.prototype[_name]=polymorph(classDefinition[_name],parentPrototype[_name]);
				}
				else{
					//�������Ҫ��̬����ֱ�ӽ�classDefinition����ֱ�����е���ӳ�䵽�¡��ࡱ��ԭ�ͼ���
					_NewClass.prototype[_name]=classDefinition[_name];
				}
			}
		}
		
		//ȷ�����캯������������ȷ�������Ƿ�̳�
		//���Է�classDefinition����ֱ����������Ϊconstructor�����Ի򷽷���
		_NewClass.prototype.constructor=_NewClass;
		
		//Ϊ�´����ġ��ࡱ������һ��extend()������ָ��˽�е�extend()����������������������棬
		//����ͨ���˷������Խ���ǰ���ࡱ��Ϊ�����ࡱ������һ���ӡ��ࡱ
		_NewClass.extend=extend;
		
		return _NewClass;
	}
	
	//extend()��create()������ͬ������������һ������Ĳ��������������м̳еĸ����ࡱ��ԭ��
	function extend(classDefinition){
		return create(classDefinition,this.prototype);
	}
	
	//����ͬ�����ֽ�˽�е�create()������¶
	return{
		create:create
	};
}());


//���ࡱ��������ʵ��ʹ��

//ͨ��Class.create����һ�����ࡱ������һ������ֱ�������ö��������Щ��Ϊ�¡��ࡱ��ӵ�еĹ������Ժͷ�����initialize��������Ϊ�¡��ࡱ�Ĺ��캯��
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

//Class.create�ڴ��������С��ࡱ�������һ��extend����������ʹ�ø÷���������Accommodation�����࣬��ʵ�ּ򵥵ļ̳С�
//�����ࡱ�����й��з��������Զ����඼���ã����ͬ���򸲸Ǹ���
var House=Accommodation.extend({
	floors:2,
	lock:function(){
	//��Ȼ�����ö�̬����������ࡱ�е�ͬ���������Կ�ͨ��this.parent���ʱ�����ĸ����ࡱ����
		this._parent();
		alert("Number of floors locked:"+this.floors);
	}
});

//�����¡��ࡱ�Ķ���ʵ��
var myAccommodation =new Accommodation();
alert(myAccommodation instanceof Accommodation); //true
alert(myAccommodation instanceof House); //false

var myHouse=new House();
alert(myHouse.isLocked); //false (�ɸ����ࡱ��initialize���������ã��÷�����House�̳�)
myHouse.lock(); //����������Ϣ��Number of floors locked��2��
alert(myHouse.isLocked); //true
alert(myHouse instanceof House); //true
alert(myHouse instanceof Accommodation); //true
