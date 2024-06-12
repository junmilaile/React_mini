// 存放工具方法的文件

/**
 * 对 fiber 对象要做的操作进行的标记
 */

// 没有任何操作
export const NoFlags = 0b00000000000000000000
// 节点新增、插入、移动
export const Placement = 0b0000000000000000000010 // 2
// 节点更新属性
export const Update = 0b0000000000000000000100 // 4
// 删除节点
export const Deletion = 0b0000000000000000001000 // 8

/**
 * 判断参数 s 是否为字符串
 * @param {*} s
 * @returns
 */
export function isStr(s) {
  return typeof s === 'string'
}

/**
 * 判断参数 fn 是否为函数
 * @param {*} fn
 * @returns
 */
export function isFn(fn) {
  return typeof fn === 'function'
}

/**
 * 判断参数 s 是否为 undefined
 * @param {*} s
 * @returns
 */
export function isUndefined(s) {
  return s === undefined
}
/**
 * 判断参数 arr 是否为数组
 * @param {*} arr 
 * @returns 
 */
export function isArray(arr) {
  return Array.isArray(arr)
}
/**
 * 该方法主要负责更新DOM节点的属性
 * @param {*} node 真的DOM节点
 * @param {*} prevVal 旧值
 * @param {*} nextVal 新值
 */
export function updateNode(node, prevVal, nextVal) {
  // 这里其实要做的事情就分为两个部分：
  // 1. 对旧值的处理
  // 2. 对新值的处理

  // 步骤一：对旧值进行处理
  Object.keys(prevVal).forEach((k) => {
    if (k === 'children') {
      if (isStr(prevVal[k])) {
        node.textContent = ''
      }
    } else if (k.startsWith('on')) {
      let eventName = k.slice(2).toLowerCase()
      // 需要注意，如果是 change 事件，那么背后绑定的是 input 事件
      // 这里我们需要做一下处理
      if (eventName === 'change') {
        eventName = 'input'
      }

      // 移除事件
      node.removeEventListener(eventName, prevVal[k])
    } else {
      // 这里进入的就是普通属性
      // 例如 id、className 之类的
      // 这里不能无脑的直接去除，应该检查一下新值中是否还有这个属性
      // 如果没有，我们需要将其移除掉
      if (!(k in nextVal)) {
        node[k] = ''
      }
    }
  })

  // 步骤二：对新值进行处理
  Object.keys(nextVal).forEach((k) => {
    if (k === 'children') {
      if (isStr(nextVal[k])) {
        node.textContent = nextVal[k]
      }
    } else if (k.startsWith('on')) {
      let eventName = k.slice(2).toLowerCase()
      // 需要注意，如果是 change 事件，那么背后绑定的是 input 事件
      // 这里我们需要做一下处理
      if (eventName === 'change') {
        eventName = 'input'
      }

      // 添加事件
      node.addEventListener(eventName, nextVal[k])
    } else {
      // 这里进入的就是普通属性
      // 例如 id、className 之类的
      node[k] = nextVal[k]
    }
  })
}
