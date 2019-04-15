import { user as cbpc } from './listCBPC';
import { user as paper } from './listPaper';
import { user as print } from './listPrint';
const userList = (type, voteType) => {
  const DEFAULT_SCORE = 3;

  const arr = [cbpc, paper, print][voteType];

  return {
    limit: arr[type].limit,
    title: arr[type].title,
    data: arr[type].data.map((user) => {
      return {
        name: user[1],
        dpt: user[2],
        desc: user[0],
        value: DEFAULT_SCORE
      };
    })
  };
};
export default userList;
