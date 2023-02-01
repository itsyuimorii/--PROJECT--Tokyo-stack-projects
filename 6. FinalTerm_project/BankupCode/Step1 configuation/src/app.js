import { $dataMetaSchema } from "ajv";
import indexTpl from "./views/index.art";
import signInTpl from "./views/signin.art";

// const html = indexTpl({});
// console.log(html);
const html = signInTpl({});

$("#root").html(html);
