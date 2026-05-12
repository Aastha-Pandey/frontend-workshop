/*  
Tiny React
render(element, container) — recursive walk, mount static tree.
*/

function render(element, container) {
  if (typeof element === "string") {
    container.appendChild(document.createTextNode(element));
  } else {
    const ele = document.createElement(element.type);
    Object.keys(element.props).forEach((key) => {
      if (key === "children") return;
      if (key === "className") {
        ele.setAttribute("class", element.props[key]);
      } else if (key === "style") {
        Object.keys(element.props.style).forEach((k) => {
          ele.style[k] = element.props.style[k];
        });
      } else {
        ele.setAttribute(key, element.props[key]);
      }
    });
    const children = element.props.children;
    if (children !== undefined) {
      const childArray = Array.isArray(children) ? children : [children];
      childArray.forEach((child) => render(child, ele));
    }
    container.appendChild(ele);
  }
}
