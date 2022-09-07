// async function sample() {
//     const res1 = await Promise.resolve(1)
//     console.log(res1)
//     const res2 = await Promise.resolve(2)
//     console.log(res2)
//     const res3 = await Promise.resolve(3)
//     console.log(res3)
// }
// sample()


function* myGenerator() {
    const res1 = yield Promise.resolve(1)
    console.log(res1)
    const res2 = yield Promise.resolve(2)
    console.log(res2)
    const res3 = yield Promise.resolve(3)
    console.log(res3)
}

// const gen = myGenerator()
// gen.next().value.then(res => {
//     gen.next(res).value.then(res => {
//         gen.next(res).value.then(res => {
//             gen.next(res)
//         })
//     })
// })

function run(gen) {
    const g = gen()

    // 封装一个方法递归调用next
    function _next(val) {
        const res = g.next(val)
        if (res.done) return res.value // 终止条件
        res.value.then(val => {
            _next(val)
        })
    }
    _next()
}

// run(myGenerator)

// 完善run方法，处理一些细节
function runPlus(gen) {
    // 返回一个promise对象，跟async保持一致
    return new Promise((resolve, reject) => {
        const g = gen()

        function _next(val) {
            try {
                const res = g.next(val)
                if (res.done) {
                    return resolve(res.value)
                }
                // 用promise包装res.value是为了兼容yield后面跟着的是基本类型的情况
                Promise.resolve(res.value).then(val => {
                    _next(val)
                }, err => {
                    // 如果promise执行失败，应该使用Generator.prototype.throw()把错误抛出来，
                    // 才能被外层generator的try catch捕获到
                    resolve(g.throw(err).value)
                })
            } catch (err) {
                return reject(err)
            }

        }
        _next()
    })
}

function* myGen() {
    try {
        const res1 = yield Promise.resolve(1)
        console.log(res1)
        const res2 = yield 2
        console.log(res2)
        const res3 = yield Promise.reject('err')
    } catch (err) {
        console.log(err)
    }
}

const p = runPlus(myGen)
p.then(res => {
        console.log(111)
        console.log(res)},
        err => {
            console.log(222)
            console.log(err)
})

