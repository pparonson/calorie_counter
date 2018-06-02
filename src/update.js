import * as R from "ramda";

const MSGS = {
  SHOW_FORM: "SHOW_FORM"
  , MEALS_INPUT: "MEALS_INPUT"
  , CALORIES_INPUT: "CALORIES_INPUT"
  , SAVE_MEAL: "SAVE_MEAL"
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
    // get type
    type: MSGS.MEALS_INPUT
    // set description
    , description: _description
  };
}

export function caloriesInputMsg(_calories) {
  return {
    type: MSGS.CALORIES_INPUT
    , calories: _calories
  };
}

export const saveMealMsg = {type: MSGS.SAVE_MEAL};

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
    // const {calories} = _msg;
    // handle input type with fn composition here
    const calories = R.compose(
      R.defaultTo(0),
      parseInt
    )(_msg.calories);
    return {..._model, calories};
  }
  if (_msg.type === "SAVE_MEAL") {
    return add(_msg, _model);
  }
  return _model;
}

function add(_msg, _model) {
  const {description, calories, nextId} = _model;
  // literal syntax
  const meal = {id: nextId, description, calories}
  // return the prev arr with new obj appended
  const meals = [..._model.meals, meal];
  // return a new model with properties clear and inc nextId
  return {
    ..._model
    , description: ""
    , calories: 0
    , showForm: false
    , nextId: nextId  + 1
    , meals
  };
}

export default update;
