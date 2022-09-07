async function sample() {
    const res1 = await Promise.resolve(1)
    console.log(res1)
    const res2 = await Promise.resolve(2)
    console.log(res2)
    const res3 = await Promise.resolve(3)
    console.log(res3)
}

sample()
