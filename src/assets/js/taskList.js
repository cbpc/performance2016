import cbpc from './listCBPC';
const taskList = (type) => {
	const list = [
		cbpc.title, ['管理人员', '技术人员', '高级工']
	];
	return list[type];
};

export default taskList;