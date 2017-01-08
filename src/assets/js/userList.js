import cbpc from './listCBPC';

const userList = (type) => {
	const DEFAULT_SCORE = 3;
	let list = [];
	list = cbpc.user.map((item, idx) => {
		var title = cbpc.title[idx];
		var data = [];
		data = item.map((user) => {
			return {
				name: user[0],
				dpt: user[1],
				desc: user[2],
				value: DEFAULT_SCORE
			};
		});
		return {
			title,
			data
		};
	});
	return list[type];
};

export default userList;