import { $dataMetaSchema } from "ajv";
import indexTpl from "./views/index.art";

const html = indexTpl({});
console.log(html);

$("#root").html(html);
