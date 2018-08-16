
# Investigating React

Purpose: to try to understand how React works in more detail, especially to be able
to write unit tests more reliably.

## In The Browser

* `window["app"] = this; // inside <App />

* app: {
  * context: {}
  * props: {}
  * refs: {}
  * state: null
  * updater: {
    * enqueueForceUpdate(inst, callback)
    * enqueueReplaceState(inst, payload, callback)
    * enqueueSetState(inst, payload, callback)
    * isMounted(component)
  * _reactInternalFiber: FiberNode
  * _reactInternalInstance:
  * __proto__: Component
    * constructor(): App
    * render()

React components inherit from React.Component, and are created using React.createElement()


* Renderer.create() returns a Component
* Component.getInstance() returns an instance, like app above



## In Node

* `const element = <Product data={Data} />` // JSX.Element
* `ReactTestUtils.isElement(element)` // true
* `const comp = ReactTestUtils.renderIntoDocument(element)` // React.Component
  * we can then access `comp.props` and `comp.state`
  * this requires a DOM in place, which can be achieved by either:
  * (a) set up jsdom manually BEFORE importing react:
    * `import * as Jsdom from "jsdom"`
    * `global.document = new Jsdom.JSDOM("<!doctype html><html><body></body></html>")`
    * `global.window = document.parentWindow`
  * (b) Jest can give you an environment with jsdom automatically set up:
    * `// @jest-environment jsdom`
* `const grid = ReactTestUtils.scryRenderedComponentsWithType(comp, GridListTile as any)` // React.Component
* `const divs1 = ReactTestUtils.scryRenderedDOMComponentsWithTag(comp, "div")` // Element[]
* `ReactTestUtils.Simulate.click(divs1[1])`
