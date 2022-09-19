function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child(name) {
    Parent.call(this, name)
}
Child.prototype = new Parent('zzw')
Child.prototype.constructor = Child

var child1 = new Child('lmz')
var child2 = new Child('lmz')

console.log(child1.name) // ['lmz']
console.log(child2.name) // ['lmz']

child1.name[0] = 'yjh'
console.log(child1.name) // ['yjh']
console.log(child2.name) // ['lmz']

child1.getName() // ['yjh']
child2.getName() // ['lmz']

/*
* 组合式继承的缺点
* 每次创建子类实例的时候都会执行两次父类的构造函数，一次在Parent.call()，一次在new Parent()
* 所以子类实例其实是存在两份父类的属性，一份在自己的实例里面，一份在子类的原型对象上
* 虽然不影响属性的访问，因为默认是访问实例中的属性，但是这样不太美观
* */