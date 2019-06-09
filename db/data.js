const moment = require('moment');

function gettimeA(str1, str2) {
	return [
		moment(str1, 'YYYYMMDD').format('YYY-MM-DD'),
		moment(str2, 'YYYYMMDD').format('YYY-MM-DD'),
		new Date(),
	];
}

function gettimeB(str1) {
	return moment(str1, 'YYYYMMDD').format('YYY-MM-DD');
}

const userdata = [
// usid(P) uname email password utype coin roleman 
  ['pt85e4wc', 'Bill', 'bill@gmail.com', 'password1', 'local', 0, 'guess'],
	['j65t2kz7', 'Johnston', 'johnston@gmail.com', 'password1', 'facebook', 0, 'guess'],  
	['4n4vzh6y', 'Harris', 'harris@gmail.com', 'password1', 'local', 0, 'guess'],
	['dx799hbm', 'Daniel', 'daniel@gmail.com', 'password1', 'facebook', 0, 'guess'],
	['zsuz2xum', 'Nikolas', 'nikolas@gmail.com', 'password1', 'local', 0, 'guess'],
	['628dfwy4', 'Landry', 'landy@gmail.com', 'password1', 'local', 0, 'guess'],
	['4ukat4a5', 'Diego', 'diego@gmail.com', 'password1', 'local', 0, 'guess'],
	['t7twt9ez', 'Israel', 'israel@gmail.com', 'password1', 'facebook', 0, 'guess'],
	['f6hv59f3', 'Gage', 'gage@gmail.com', 'password1', 'facebook', 0, 'guess'],
  ['czqj8t8e', 'Wii', 'will@gmail.com', '12345678', 'local', 0, 'admin'],
];

const pagedata = [
// usid        paid(P)     ptype
	['pt85e4wc', 'gav8ugsm', 'Note'],
	['j65t2kz7', 'n8e7gdfu', 'Reading'],
	['4n4vzh6y', 'f9b7h852', 'Reading'],
	['dx799hbm', 'squ8869x', 'Note'],
	['zsuz2xum', '8kku36qh', 'Calender'],
	['628dfwy4', 'qphh6gh9', 'Calender'],
	['4ukat4a5', 'aerprb5r', 'Tasklist'],
	['t7twt9ez', 'a2amw246', 'Tasklist'],
	['f6hv59f3', 'epm99vts', 'Note'],
	['czqj8t8e', '8hmyr732', 'Reading'],
];

const leveldata = [
// usid(P) ltype starttime expiretime expirestamp
	['pt85e4wc', 'free  ', ...gettimeA('20171020', '20171120')],
	['j65t2kz7', 'bronze', ...gettimeA('20180120', '20180401')],
	['4n4vzh6y', 'bronze', ...gettimeA('20170320', '20170520')],
	['dx799hbm', 'sliver', ...gettimeA('20171020', '20171225')],
	['zsuz2xum', 'golden', ...gettimeA('20171020', '20180120')],
	['628dfwy4', 'sliver', ...gettimeA('20171020', '20171120')],
	['4ukat4a5', 'free  ', ...gettimeA('20171020', '20171120')],
	['t7twt9ez', 'golden', ...gettimeA('20171020', '20171120')],
	['f6hv59f3', 'sliver', ...gettimeA('20171020', '20171120')],
	['czqj8t8e', 'golden', ...gettimeA('20171020', '20171120')],
];

const contentdata = [
// paid coid(P) creattime label, docs
	['gav8ugsm', 'pwhas53t', gettimeB('20171020'), 'label1', 'docs1'],
	['n8e7gdfu', 'qc6e5672', gettimeB('20171020'), 'label2', 'docs2'],
	['f9b7h852', 'whz6sz8j', gettimeB('20171020'), 'label3', 'docs3'],
	['squ8869x', 'rkegpv2h', gettimeB('20171020'), 'label4', 'docs4'],
	['8kku36qh', 'wm2vgdra', gettimeB('20171020'), 'label5', 'docs5'],
	['qphh6gh9', 'g9cbe89z', gettimeB('20171020'), 'label6', 'docs6'],
	['aerprb5r', 'dt746m2n', gettimeB('20171020'), 'label7', 'docs7'],
	['a2amw246', '3jrd78jr', gettimeB('20171020'), 'label8', 'docs8'],
	['epm99vts', 'sxm23f2u', gettimeB('20171020'), 'label9', 'docs9'],
	['8hmyr732', 'mrvqrq2t', gettimeB('20171020'), 'label10', 'docs10'],
];

const frienddata = [
// usid1 usid2 makedate
	['pt85e4wc', 'dx799hbm', gettimeB('20171020')],
	['dx799hbm', 't7twt9ez', gettimeB('20171020')],
	['f6hv59f3', 'j65t2kz7', gettimeB('20171020')],
	['4n4vzh6y', 'zsuz2xum', gettimeB('20171020')],
	['f6hv59f3', 'pt85e4wc', gettimeB('20171020')],
	['628dfwy4', '4ukat4a5', gettimeB('20171020')],
	['j65t2kz7', 'zsuz2xum', gettimeB('20171020')],
	['czqj8t8e', 'pt85e4wc', gettimeB('20171020')],
	['4n4vzh6y', '628dfwy4', gettimeB('20171020')],
	['zsuz2xum', 'j65t2kz7', gettimeB('20171020')],
];

module.exports = {
	user: userdata,
	page: pagedata,
	level: leveldata,
	content: contentdata,
	friend: frienddata,
};
