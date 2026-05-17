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

console.log("fiber", fiber);
