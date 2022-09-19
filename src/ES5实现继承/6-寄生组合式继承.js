function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child(name) {
    Parent.call(this, name)
}

function createObj(o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn()
}

function inheritPrototype(childConstructor, parentConstructor) {
    var prototype = createObj(parentConstructor.prototype)
    prototype.constructor = childConstructor
    childConstructor.prototype = prototype
}

inheritPrototype(Child, Parent)

Child.prototype.sayHi = function() {
    console.log('Hi')
}

var p = new Parent('zzw')
var c1 = new Child('lmz')
var c2 = new Child('lmz')

console.log(p.name, c1.name, c2.name) // [ 'zzw' ] [ 'lmz' ] [ 'lmz' ]

c1.name.push('yjh')
console.log(p.name, c1.name, c2.name) // [ 'zzw' ] [ 'lmz', 'yjh' ] [ 'lmz' ]

c1.getName() // [ 'lmz', 'yjh' ]
p.getName() // ['zzw']

c1.sayHi() // 'Hi'
p.sayHi() // 报错，找不到该方法

/*
* 寄生组合式继承
* 只调用了一次父类的构造函数，避免子类原型上出现多余的属性
* 父类和子类的原型之间不会产生干扰，因为子类对父类的原型进行了拷贝
* 在ES5中，寄生组合式继承是最理想的继承方式
* */
