function createObj(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}

function anotherObj(original) {
    var obj = createObj(original)
    // 定义自己的方法
    obj.sayHi = function() {
        console.log('Hi')
    }
    return obj
}

var obj = {name: ['zzw']}
var obj1 = anotherObj(obj)
console.log(obj1.name)
obj1.sayHi()

/*
* 寄生式继承的缺点
* 跟原型式继承一样存在属性共享的问题，因为寄生式继承是在原型式继承基础上的一种封装
* 寄生式继承还存在函数无法复用的问题，每次调用anotherObj创建一个对象时，都需要重新定义一个新的函数
* */