function createObj(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}

var obj = {
    name: ['zzw']
}

var obj2 = createObj(obj)
var obj3 = createObj(obj)

console.log(obj2.name, obj3.name) // ['zzw'] ['zzw']

obj2.name.push('lmz')
console.log(obj2.name, obj3.name) // ['zzw', 'lmz'] ['zzw', 'lmz']

/*
* 原型式继承的优缺点
* 如果我们只是希望一个对象和另一个对象保持类似的情况，原型式继承可以很好的胜任
* 但是原型式继承依然存在引用类型属性共享的问题，跟原型链继承一样
* */
