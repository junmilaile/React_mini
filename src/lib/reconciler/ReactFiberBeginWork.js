import { FunctionComponent, ClassComponent, HostText, HostComponent, Fragment } from './ReactWorkTags'
import { updateHostComponent, updateHostTextComponent, updateFunctionComponent, updatClassComponent } from './ReactFiberReconciler'

/**
 * 根据 fiber 不同的 tag 值，调用不同的方法来处理
 * @param {*} wip
 */
function beginWork(wip) {
  const tag = wip.tag

  switch (tag) {
    case HostComponent: {
      updateHostComponent(wip)
      break
    }
    case FunctionComponent: {
      updateFunctionComponent(wip)
      break
    }
    case ClassComponent: {
      updatClassComponent(wip)
      break
    }
    case HostText: {
      updateHostTextComponent(wip)
      break
    }
    case Fragment: {
      break
    }
  }
}

export default beginWork
