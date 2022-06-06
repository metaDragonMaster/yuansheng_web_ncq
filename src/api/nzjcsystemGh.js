import request from '@/utils/request'
let Api = {};

//
Api.ghInfoPayDj = function(ghInfoId) {
	return request({
		url: '/ncqsystem/gh/ghInfoPayDj',
		method: 'post',
		params: {
			'ghInfoId':ghInfoId
		}
	});
}


export default Api;