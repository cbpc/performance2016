import { user as cbpc } from "./listCBPC";
import { user as g3 } from "./listPaper";
const userList = (type, voteType) => {
    const DEFAULT_SCORE = 3;
    let list = [];
    let title,
        data = [],
        limit;
    const arr = voteType == 0 ? cbpc : g3;

    return {
        limit: arr[type].limit,
        title: arr[type].title,
        data: arr[type].data.map(user => {
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