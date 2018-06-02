import {h} from "virtual-dom";
import hh from "hyperscript-helpers";
import * as R from "ramda";

import {
  showFormMsg
  , mealsInputMsg
  , caloriesInputMsg
  , saveMealMsg
} from "./update";

import initModel from "./model";

const {pre, div, h1, button, form, label, input, table, thead, tbody, tr, th
  , td} = hh(h);

// Create the meal cells (th, td)
function cell(_tag, _className, _value) {
  return _tag({className: _className}, _value);
}

function mealRow(_className, _meal) {
  return tr({className: _className}, [
    cell(td, "pa2", _meal.description)
    , cell(td, "pa2 tr", _meal.calories)
    // edit and delete buttons
    , cell(td, "pa2", [])
  ]);
}

function totalCaloriesRow(_className, _meals) {
  const total = R.compose(
    getTotalCalories
    , getCalories
  )(_meals);
  return tr({className: _className}, [
    cell(td, "pa2", "Total:")
    , cell(td, "pa2 tr", total)
    , cell(td, "", "")
  ]);
}

function tableBody(_className, _meals) {
  const rows = R.map(R.partial(mealRow, ["pa2 stripe-dark"])
    , _meals);
  return tbody({className: _className}
    // returns array of child elements
    , [
      rows
      , totalCaloriesRow("bt, b", _meals)
    ]);
}

const headerRow = tr({className: ""}, [
  cell(th, "pa2", "MEAL")
  , cell(th, "pa2", "CALORIES")
  , cell(th, "", "")
]);

function tableHead(_className) {
  return thead({className: _className}, headerRow);
}

function buttonSet(_dispatch) {
  return div(
    [
      button({
        className: "f3 pv2 ph3 bg-blue white bn mr2 dim"
        , type: "submit"
      }, "Save")
      , button(
        {
          className: "f3 pv2 ph3 bg-light-grey bn dim"
          , type: "button"
          , onclick: () => _dispatch(showFormMsg(false))
        }
        , "Cancel")
    ]
  );
}

function fieldSet(_labelText, _inputValue, oninput) {
  return div([
    label({className: "db mb1"}, _labelText)
    , input({
      className: "pa2 input-reset ba w-100 mb2"
      , type: "text"
      , value: _inputValue
      , oninput
    })
  ]);
}

function formView(_dispatch, _model) {
  const {description, calories, showForm} = _model;
  if (showForm) {
    return form(
      {
        className: "w-100 mv2"
        , onsubmit: e => {
          // prevent default form http post request
          e.preventDefault();
          _dispatch(saveMealMsg);
        }
      }, [
      fieldSet("Meal", description
        , e => _dispatch(mealsInputMsg(e.target.value)))
      , fieldSet("Calories", calories || ""
        , e => _dispatch(caloriesInputMsg(e.target.value)))
      , buttonSet(_dispatch)
    ]);
  }

  return button(
    {
      className: "f3 pv2 ph3 bg-blue white bn"
      , onclick: () => _dispatch(showFormMsg(true))
    }, "Add Meal");
}

function view(_dispatch, _model) {
  return div({className: "mw6 center"}, [
    h1({className: "f2 pv2 bb"}, "Calorie Counter")
    , formView(_dispatch, _model)
    // creates pre-tag for pre-formated text
    // , pre( JSON.stringify(_model, null, 2) )
    // table below
    , tableHead("")
    , tableBody("", _model.meals)
  ]);
}

// helpers
// point-free: meals; returns fn that takes an array of obj
const getCalories = R.map(item => item.calories);

function sum(x, y) {
  return x + y;
}
// point-free: meals; returns a fn that takes an array of int
const getTotalCalories = R.reduce(sum, 0);

export default view;
