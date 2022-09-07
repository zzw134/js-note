// 生成器根据yield语句将代码分割为switch-case块，之后通过_context.prev和_context.next来分别执行各个case
function gen$(_context) {
    while (true) {
        switch (_context.prev = _context.next) {
            case 0:
                _context.next = 2
                return 'result1'
            case 2:
                _context.next = 4
                return 'result2'
            case 4:
                _context.next = 6
                return 'result3'
            case 6:
            case 'end':
                return _context.stop()
        }
    }
}

// 低配版context
const context = {
    prev: 0,
    next: 0,
    done: false,
    stop() {
        this.done = true
    }
}

// 低配版invoke
function gen() {
    return {
        next() {
            const value = context.done ? undefined : gen$(context)
            const done = context.done
            return {
                value,
                done
            }
        }
    }
}

const g = gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())