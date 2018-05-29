import hh from "hyperscript-helpers";
import {h, diff, patch} from "virtual-dom";
import createElement from "virtual-dom/create-element";

const {div, button} = hh(h);

// WARNING: impure code below
function app(_model, _view, _update, _node) {
  let model = _model;
  let currentView = _view(dispatch, model);
  let rootNode = createElement(currentView);
  _node.appendChild(rootNode);

  function dispatch(_msg) {
    model = _update(_msg, model);
    const updatedView = _view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
