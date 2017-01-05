const getUrlParam = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = encodeURI(window.location.search).substr(1).match(reg);
	if (r !== null) return decodeURI(r[2]);
	return null;
};
const isGM = (getUrlParam('gm') !== null) ? 1 : 0;

const scoreList = [{
	label: '优秀',
	value: '10'
}, {
	label: '良好',
	value: '9'
}, {
	label: '称职',
	value: '7'
}, {
	label: '基本称职',
	value: '5'
}, {
	label: '不称职',
	value: '3'
}];

const DEFAULT_SCORE = '7';

var userList = (type) => {
	var list = [
		[{
			name: '张三',
			dpt: '某部门',
			desc: '主任，xx书记(兼)',
			value: DEFAULT_SCORE
		}, {
			name: '张三2',
			dpt: '某部门',
			desc: '主任，xx书记(兼)',
			value: DEFAULT_SCORE
		}, {
			name: '张三3',
			dpt: '某部门',
			desc: '主任，xx书记(兼)',
			value: DEFAULT_SCORE
		}],
		[]
	];
	return list[type];
};

var vm = new Vue({
	el: '#app',
	data: {
		scoreList,
		users: userList(0),
		voteType: 0,
		showList: false,
		voteNum: new Array(5).fill(0),
		curLimit: {
			excellent: 0,
			good: 0
		}
	},
	computed: {
		scoreLimit: () => {
			let obj = {
				excellent: 0,
				good: 0
			};
			list = vm.users.forEach((item) => {
				obj.excellent += (item.value == '10');
				obj.good += (item.value == '9');
			});
			return obj;
		}
	},
	watch: {
		showList: () => {
			console.log('返回列表');
			// vm.$message({
			// 	message: '恭喜你，这是一条成功消息',
			// 	type: 'success'
			// });
		},
		users: {
			handler: () => {
				let scoreLimit = vm.scoreLimit;
				if (scoreLimit.excellent > 2 || scoreLimit.good > 2) {
					console.log('最多只允许选取6名优秀/良好');
				}
				vm.curLimit = scoreLimit;
			},
			deep: true
		}
	},
	methods: {
		submit: () => {
			var votes = [];
			votes = vm.users.map(function(item) {
				return [item.name, item.dpt, item.value, isGM];
			});
			console.log(JSON.stringify(votes));
			vm.voteNum[vm.voteType] = 1;
			vm.back();
			//write the data to localStorage
		},
		back: () => {
			vm.showList = true;
		}
	}
});