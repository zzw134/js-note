// promise三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    constructor(executor) {
        this._status = PENDING  // 初始化状态
        this._value = undefined  // 用来存放then回调接收的值
        // resolve和reject队列，用来存放then()传来的回调任务
        // 之所以使用队列，是为了使同一个promise能够多次调用then方法
        this._resolveQueue = []
        this._rejectQueue = []

        let _resolve = (res) => {
            const run = () => {
                if (this._status !== PENDING) return
                this._value = res
                this._status = FULFILLED
                while (this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift()
                    callback(res)
                }
            }
            // 让resolve变成一个异步任务，使then方法能够比resolve先执行
            setTimeout(run)
        }

        let _reject = (err) => {
            const run = () => {
                if (this._status !== PENDING) return
                this._value = err
                this._status = REJECTED
                while (this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift()
                    callback(err)
                }
            }
            setTimeout(run)

        }
        executor(_resolve, _reject)
    }

    then(resolveFn, rejectFn) {
        // 防止传入then方法的值不是函数类型
        typeof resolveFn !== 'function' ? resolveFn = value => value : null
        typeof rejectFn !== 'function' ? rejectFn = err => {
            throw new Error(err instanceof Error ? err.message : err)
        } : null

        // 返回一个新的promise对象，实现then的链式调用
        return new MyPromise((resolve, reject) => {
            // 给resolveFn包装一下，最后将包装好的新函数push进对应的队列里
            const fulfilledFn = (res) => {
                try {
                    const result = resolveFn(res)
                    // 如果回调函数返回的是一个promise对象，则等待结果fulfilled或者reject后传给下一个then
                    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
                } catch(err) {
                    reject(err)
                }
            }

            const rejectedFn = (err) => {
                try {
                    const result = rejectFn(err)
                    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
                } catch (err) {
                    reject(err)
                }
            }

            // 进行状态的判断是为了当出现then方法在resolve之后执行的情况，
            // 此时状态已经改变，resolve不会再执行队列中的回调函数
            // 比如
            // const p = Promise.resolve('1')
            // setTimeout(() => {p.then(() => {
            //     console.log('111')})})
            switch (this._status) {
                case PENDING:
                    this._resolveQueue.push(fulfilledFn)
                    this._rejectQueue.push(rejectedFn)
                    break
                case FULFILLED:
                    fulfilledFn(this._value)
                    break
                case REJECTED:
                    rejectedFn(this._value)
                    break
            }
        })
    }

    catch(rejectFn) {
        return this.then(undefined, rejectFn)
    }

    // finally有一个细节，当finally的回调抛出错误或者返回一个reject状态的promise时，
    // 会把上一个promise的fulfilled状态变成rejected状态
    finally(callback) {
        return this.then(res => {
            MyPromise.resolve(callback()).then(() => res)
        }, err => {
            MyPromise.resolve(callback()).then(() => {throw err})
        })
    }

    static resolve(value) {
        return value instanceof MyPromise ? value : new MyPromise((resolve) => {
            resolve(value)
        })
    }

    static reject(err) {
        return new MyPromise((resolve, reject) => {
            reject(err)
        })
    }

    static all(promiseArr) {
        const result = []
        let index = 0
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((p, i) => {
                MyPromise.resolve(p).then(res => {
                    index++
                    result[i] = res
                    if (index === promiseArr.length) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            for (const p of promiseArr) {
                MyPromise.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
}

// ------------test-------------
const p = new MyPromise((resolve, reject) => {
    resolve(12)
})
p.then((res) => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
        // reject('err')
        reject(111)
    })
}).finally(() => {
    return new MyPromise((resolve, reject) => {
        reject(666)
    })
}).then(res => {
    console.log(res)
}, err => {
    console.log('777' + err)
    return 1
})



