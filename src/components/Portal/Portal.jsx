import ReactDOM from "react-dom";

const Portal = (children, selector) => (
  ReactDOM.createPortal(
    children,
    document.querySelector(`${selector}`),
  ));

export default Portal;
