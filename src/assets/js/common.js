const getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = encodeURI(window.location.hash.slice(2))
    .substr(1)
    .match(reg);
  if (r !== null) return decodeURI(r[2]);
  return null;
};

function jsRight(sr, rightn) {
  return sr.substring(sr.length - rightn, sr.length);
}

const getDate = (type = 0) => {
  var date = new Date();
  var a = date.getFullYear();
  var b = jsRight('0' + (date.getMonth() + 1), 2);
  var c = jsRight('0' + date.getDate(), 2);
  var d = jsRight('0' + date.getHours(), 2);
  var e = jsRight('0' + date.getMinutes(), 2);
  var f = jsRight('0' + date.getSeconds(), 2);
  return type ? a + '-' + b + '-' + c + ' ' + d + ':' + e + ':' + f : a + b + c;
};

const yearMonth = () => {
  var date = new Date();
  var a = date.getFullYear();
  var b = jsRight('0' + (date.getMonth() + 1), 2);
  return a + b;
};

const saveInfo = (info, key = 'performance') => {
  key = key + '-' + info.type;
  var data = {
    date: getDate(),
    data: info
  };
  localStorage.setItem(key, JSON.stringify(data));
};

const readInfo = (type, key = 'performance') => {
  key = key + '-' + type;
  var data = localStorage.getItem(key);
  if (!(data == null)) {
    data = JSON.parse(data);
  } else {
    data = {
      date: getDate(),
      data: {
        type: 0,
        step: 0
      }
    };
  }
  data.data.step = Number.parseInt(data.data.step, 10);
  return data;
};

export default {
  getUrlParam,
  getDate,
  saveInfo,
  readInfo,
  yearMonth
};
