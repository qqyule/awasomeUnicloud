'use strict';
const api = require('./api.js')

async function http(apiUrl) {
	const res = uniCloud.httpclient.request(apiUrl, {
		method: 'GET',
		data: {
			key: api.txApikey
		},
		dataType: 'json',
		timeout: 3000
	})
	return res
}

exports.main = async (event, context) => {

	event = {
		apiName: 'bulletin'
	}

	// 解构event
	const {
		apiName
	} = event
	const {
		result
	} = await uniCloud.callFunction({
		name: 'db',
		data: {
			method: 'querry',
			collection: 'apis',
			querryItem: {
				where: {
					'name': apiName
				},
				field: {
					'_id': true,
					'addDate': true,
					'newslist': true
				}
			}
		}
	})

	if (result.affectedDocs > 0) {
		// 数据库存在api缓存
		console.log('已存在缓存')

		const now = Date.parse(new Date())
		const addDate = result.data[0].addDate

		if (now - Date.parse(addDate) > 100000) {
			const res = await http(api[apiName])
			if (res.status === 200) {
					res.data['addDate'] = new Date().toISOString();
				// 把API数据更新到云数据库
				const result2 = await uniCloud.callFunction({
					name: 'db',
					data: {
						method: 'update',
						collection: 'apis',
						doc: result.data[0]._id,
						data: res.data
					}
				})
				console.log(result2)
				return result2
			}
		} else {
			return result.data[0].newslist
		}
	} else {
		const res = await http(api[apiName])
		if (res.status === 200) {
			res.data['name'] = apiName
			// 把API数据缓存到云数据库
			const result = await uniCloud.callFunction({
				name: 'db',
				data: {
					method: 'add',
					collection: 'apis',
					data: res.data
				}
			})
			console.log(result)
		}
	}
};
