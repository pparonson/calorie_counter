import app from "./app";
import initModel from "./model";
import update from "./update";
import view from "./view";

const node  = document.getElementById("app");

app(initModel, view, update, node);
