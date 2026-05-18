import { createElement } from "./index.js";

function createFiber(element) {
  const rootFiber = {
    type: element.type,
    props: element.props,
    dom: null,
    parent: null,
    child: null,
    sibling: null,
  };

  const rawChildren = rootFiber.props.children;
  const childArray = Array.isArray(rawChildren)
    ? rawChildren
    : rawChildren != null
      ? [rawChildren]
      : [];

  const fibers = childArray.map((child) => {
    if (typeof child === "string") {
      return {
        type: "TEXT_NODE",
        props: { nodeValue: child },
        dom: null,
        parent: null,
        child: null,
        sibling: null,
      };
    } else {
      return createFiber(child);
    }
  });

  fibers.forEach((fiber, index) => {
    fiber.parent = rootFiber;
    if (index === 0) {
      rootFiber.child = fiber;
    } else {
      fibers[index - 1].sibling = fiber;
    }
  });

  return rootFiber;
}

const element = createElement(
  "div",
  null,
  createElement("h1", null, createElement("h3", null, "nice")),
  createElement("h2", null, "Aastha"),
);

const fiber = createFiber(element);

function printTree(fiber, depth = 0) {
  if (!fiber) return;
  const indent = "  ".repeat(depth);
  const label =
    fiber.type === "TEXT_NODE" ? `"${fiber.props.nodeValue}"` : fiber.type;
  console.log(indent + label);
  printTree(fiber.child, depth + 1);
  printTree(fiber.sibling, depth);
}

printTree(fiber);

function performUnitOfWork(fiber) {
  if (fiber.type === "TEXT_NODE") {
    fiber.dom = document.createTextNode(fiber.props.nodeValue);
  } else {
    fiber.dom = document.createElement(fiber.type);
  }
  if (fiber.child) return fiber.child;
  if (fiber.sibling) return fiber.sibling;

  let ancestor = fiber;
  while (ancestor) {
    if (ancestor.sibling) return ancestor.sibling;
    ancestor = ancestor.parent;
  }
  return null;
}

let nextUnitOfWork = fiber;

function workloop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
    commitRoot(fiber);
  }
  requestIdleCallback(workloop);
}

requestIdleCallback(workloop);

function commitRoot(fiber) {
  if (fiber == null) return;
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  commitRoot(fiber.child);
  commitRoot(fiber.sibling);
}
