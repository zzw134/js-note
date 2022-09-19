function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child() {
    Parent.call(this, 'zzw')
}

var child1 = new Child()
var child2 = new Child()
console.log(child1.name) // ['zzw']
console.log(child2.name) // ['zzw']

child1.name[0] = 'lmz'
console.log(child1.name) // ['lmz']
console.log(child2.name) // ['zzw']

child1.getName() // 报错，找不到getName方法

/*
* 构造函数继承的缺点
* 子类继承不到父类原型上的属性和方法
*/
