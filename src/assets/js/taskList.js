import { user as cbpc } from "./listCBPC";
import { user as g3 } from "./listG3";
const list = [cbpc.map(item => item.title), g3.map(item => item.title)];
const taskList = type => list[type];
export default taskList;