import h from "hyperscript";
import hh from "hyperscript-helpers";

const {div, button} = hh(h);

const title = div({className: "mv2"}, "Hello World");
const nodeTitle = document.getElementById("appTitle");

nodeTitle.appendChild(title);
