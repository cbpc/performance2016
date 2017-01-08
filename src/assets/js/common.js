const getUrlParam = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = encodeURI(window.location.search).substr(1).match(reg);
	if (r !== null) return decodeURI(r[2]);
	return null;
};

export default getUrlParam;