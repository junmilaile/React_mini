import { updateNode } from '../shared/utils'
import { reconcilerChild } from './ReactchildFiber'
/**
 *
 * @param {*} wip 需要处理的 fiber 对象节点
 * 注意这个 fiber 节点已经能够确定的是一个 HostComponent
 */
export function updateHostComponent(wip) {
  // 创建真实Dom
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, {}, wip.props)
    // 到目前为止，说明当前的 fiber 节点所对应的 stateNode 已经有值了，也就是说有对应的 DOM 了
    // 因此接下来的下一步，我们就应该处理子节点了
    reconcilerChild(wip, wip.props.children)
    // 上一步执行完毕后，说明已经处理完了所有的子节点 vnode，fiber 的链表也就形成了
  }
}

/**
 * 创建文本节点
 * @param {*} wip
 */
export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.childern)
}
/**
 * 创建函数组件
 * @param {*} wip
 */
export function updateFunctionComponent(wip) {
  const { type, props } = wip
  // 这里从当前的 wip 上面获取到的 type 是一个函数
  // 那么我们就直接执行这个函数，获取到它的返回值
  const children = type(props)
  // 有了 vnode 节点之后，就调用 reconcileChildren 方法，来处理子节点
  reconcilerChild(wip, children)
}

/**
 * 创建类组件
 * @param {*} wip
 */
export function updatClassComponent(wip) {
  const {type, props} = wip

  const instance = new type(props)

  const childre = instance.render()
  
  reconcilerChild(wip, childre)
}