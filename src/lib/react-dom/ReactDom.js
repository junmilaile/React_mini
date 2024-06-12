import createFiber from '../reconciler/ReactFiber'
import scheduleUpdateOnFiber from '../reconciler/ReactFiberWorkLoop'

function updateContainer(element, container) {
  const fiber = createFiber(element, {
    type: container.nodeName.toLowerCase(),
    stateNode: container
  })

  // 到目前为止，我们就创建了第一个 fiber 对象
  // 但是目前仅仅只有最外层的父元素创建了对应的 fiber 对象
  scheduleUpdateOnFiber(fiber)
}

class ReactDomRoot {
  constructor(container) {
    this._internalRoot = container
  }

  /**
   * @param {ReactElement} children 要挂载的vnode节点
   * * 这里做一个讲课的约定：
   * 1. 以前的虚拟DOM，我们称之为 vnode
   * 2. 新的虚拟DOM，我们称之为 Fiber
   */
  render(children) {
    // console.log(children)
    updateContainer(children, this._internalRoot)
  }
}

const ReactDom = {
  /**
   *
   * @param {*} container 要挂载的根 DOM 节点
   * @return 返回值是一个对象，该对象会有一个 render 方法
   */
  createRoot(container) {
    return new ReactDomRoot(container)
  }
}

export default ReactDom
