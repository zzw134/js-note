function Parent() {
    this.name = 'zzw'
}
Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child() {}
Child.prototype = new Parent() // 将子类的原型指向父类创建的实例
Child.prototype.constructor = Child

var child = new Child()
console.log(child.name) // zzw
child.getName() // zzw


/*
*原型链继承的缺点：
*所有子类实例对象都指向同一个父类实例对象
*如果父类的某个属性的值是一个引用数据类型的值的话，子类实列如果修改了这个值，
*会导致所有的子类实例该属性的值发生改变
*/

// 实例
function Parent1() {
    this.hobbies = ['唱', '跳', 'rap' ]
}

Parent1.prototype.getHobbies = function() {
    console.log(this.hobbies)
}

function Child1() {}
Child1.prototype = new Parent1()
Child1.prototype.constructor = Child1

var child1 = new Child1()
var child2 = new Child1()
console.log(child1.hobbies) // ['唱', '跳', 'rap' ]
console.log(child2.hobbies) // ['唱', '跳', 'rap' ]
child1.hobbies.push('篮球')

console.log(child1.hobbies) // ['唱', '跳', 'rap', '篮球' ]
console.log(child2.hobbies) // ['唱', '跳', 'rap', '篮球' ]