import cbpc from './listCBPC';
import g3 from './listG3';

const userList = (type, voteType) => {
	const DEFAULT_SCORE = 3;
	let list = [];
	let title, data = [],
		limit;
	if (voteType == 0) {
		title = cbpc.title[type];
		limit = cbpc.user[type].limit;
		data = cbpc.user[type].data.map((user, idx) => {
			return {
				name: user[0],
				dpt: user[1],
				desc: user[2],
				value: DEFAULT_SCORE
			};
		});
	} else {
		title = g3.title[type];
		limit = g3.user[type].limit;
		data = g3.user[type].data.map((user, idx) => {
			return {
				name: user[1],
				dpt: user[2],
				desc: user[0],
				value: DEFAULT_SCORE
			};
		});
	}

	return {
		limit,
		title,
		data
	};
};
export default userList;