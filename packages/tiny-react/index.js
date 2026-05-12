//Implement createElement(type, props, ...children). Match React's output shape exactly.

function createElement(type, props, ...children) {
  return {
    $$typeof: Symbol.for("react.element"),
    type,
    key: null,
    ref: null,
    props: {
      ...(props || null),
      children:
        children.length === 0
          ? undefined
          : children.length === 1
            ? children[0]
            : children,
    },
  };
}

