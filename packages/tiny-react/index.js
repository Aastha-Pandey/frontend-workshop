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

const ele = createElement(
  "div",
  { className: "bg-red-400" },
  createElement(
    "p",
    { className: "text-red-400" },
    createElement("p", { className: "text-yellow-400" }, "Hey!"),
  ),
);
console.log("ele", ele);

{
  /* <div className="bg-red-400">
  <p className="text-red-400">
    <p className="text-yellow-400">Hey!</p>
  </p>
</div>;
 */
}
