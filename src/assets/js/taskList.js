import cbpc from './listCBPC';
import g3 from './listG3';
const taskList = (type) => {
	const list = [
		cbpc.title, g3.title
	];
	return list[type];
};

export default taskList;