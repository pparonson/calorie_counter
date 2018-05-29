import * as R from "ramda";

const MSGS = {
  SHOW_FORM: "SHOW_FORM"
  , MEALS_INPUT: "MEALS_INPUT"
  , CALORIES_INPUT: "CALORIES_INPUT"
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM
    // literal syntax (ie showForm: true)
    , showForm
  };
}

export function mealsInputMsg(_description) {
  return {
    type: MSGS.MEALS_INPUT
    , description: _description
  };
}

export function caloriesInputMsg(_calories) {
  return {
    type: MSGS.CALORIES_INPUT
    , calories: _calories
  };
}

function update(_msg, _model) {
  if (_msg.type === "SHOW_FORM") {
    const {showForm} = _msg;
    // return the model with new property values
    return {..._model, showForm, description: "", calories: 0};
  }
  if (_msg.type === "MEALS_INPUT") {
    const {description} = _msg;
    return {..._model, description};
  }
  if (_msg.type === "CALORIES_INPUT") {
    const {calories} = _msg;
    return {..._model, calories};
  }
  return _model;
}

export default update;
