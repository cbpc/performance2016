import { user as cbpc } from './listCBPC';
import { user as paper } from './listPaper';
import { user as print } from './listPrint';
const list = [
  cbpc.map((item) => item.title),
  paper.map((item) => item.title),
  print.map((item) => item.title)
];
const taskList = (type) => list[type];
export default taskList;
