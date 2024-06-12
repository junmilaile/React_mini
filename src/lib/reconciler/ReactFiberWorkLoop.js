import beginWork from './ReactFiberBeginWork'
import completeWork from './ReactFiberCompleteWork'
import commitWorker from './ReactFiberCommitWork'
// 该文件负责整个 React 的一个执行流行

// wip 的英语全称为 work in progress，表示正在进行的工作
// 我们使用这个变量来保存当前正在进行的工作 fiber 对象
let wip = null
// 从名字上也可以看出，这是保存当前根节点的 fiber 对象
let wipRoot = null

function scheduleUpdateOnFiber(fiber) {
  wip = fiber
  wipRoot = fiber

  requestIdleCallback(workloop)
}

/**
 * 该函数会在每一帧有剩余时间的时候执行
 */
function workloop(deadline) {
  while (wip && deadline.timeRemaining() > 0) {
    // 进入此循环，说明有需要进行处理的 fiber 节点
    // 并且目前也有时间来处理
    performUnitOfWork() // 该方法负责处理一个 fiber 节点
  }

  // 代码来这里，说明要么是没时间，这个我们不需要管
  // 还有一种情况，就是整个 fiber 树都处理完了
  if (!wip) {
    // 说明整个 fiber 树都处理完了
    // 我们需要将 wipRoot 提交到 DOM 节点上
    commitRoot()
  }
}

/**
 * 该函数主要负责处理一个 fiber 节点
 * 有下面的事情要做：
 * 1. 处理当前的 fiber 对象
 * 2. 通过深度优先遍历子节点，生成子节点的 fiber 对象，然后继续处理
 * 3. 提交副作用
 * 4. 进行渲染
 */

function performUnitOfWork() {
  beginWork(wip)

  if (wip.child) {
    wip = wip.child
    return
  }

  completeWork(wip)

  // 如果没有子节点，就需要找到兄弟节点
  let next = wip  // 先缓存一下当前的 wip
  while (next) {
    if (next.sibling) {
      wip = next.sibling
      return
    }
    next = next.return

    completeWork(next)
  }

  wip = null
}

/**
 * 执行该方法的时候，说明整个节点的协调工作已经完成
 * 接下来就进入到渲染阶段
 */
function commitRoot() {
  commitWorker(wipRoot)
  // 渲染完成后将 wipRoot 置为 null
  wipRoot = null
}

export default scheduleUpdateOnFiber
