import {h} from "virtual-dom";
import hh from "hyperscript-helpers";

const {pre, div, h1, button, form, label, input} = hh(h);

function buttonSet(_dispatch) {
  return div([
    button({
      className: "f3 pv2 ph3 bg-blue white bn mr2 dim"
      , type: "submit"
    }, "Save")
    , button({
      className: "f3 pv2 ph3 bg-light-grey bn dim"
      , type: "button"
    }, "Cancel")
  ]);
}

function fieldSet(_labelText, _inputValue) {
  return div([
    label({className: "db mb1"}, _labelText)
    , input({
      className: "pa2 input-reset ba w-100 mb2"
      , type: "text"
      , value: _inputValue})
  ]);
}

function formView(_dispatch, _model) {
  const {description, calories, showForm} = _model;
  if (showForm) {
    return form({className: "w-100 mv2"}, [
      fieldSet("Meal", description)
      , fieldSet("Calories", calories || "")
      , buttonSet(_dispatch)
    ]);
  }

  return button({className: "f3 pv2 ph3 bg-blue white bn"}, "Add Meal");
}

function view(_dispatch, _model) {
  return div({className: "mw6 center"}, [
    h1({className: "f2 pv2 bb"}, "Calorie Counter")
    , formView(_dispatch, _model)
    // creates pre-tag for pre-formated text
    , pre( JSON.stringify(_model, null, 2) )
  ]);
}

export default view;
