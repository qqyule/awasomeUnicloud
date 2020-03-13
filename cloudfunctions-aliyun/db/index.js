'use strict';
// 引用数据库
const db = uniCloud.database();

// 系统时间，阿里云必须使用toISOString格式化，日期形式（2020-02-10T04:59:05.579Z）
const addDate = new Date().toISOString();

// 增加记录
const add = function(data, collection) {
	// 每条记录自动插入时间
	data['addDate'] = addDate;
	return db.collection(collection).add(data);
}

// 删除记录
const remove = function(doc, collection) {
	return db.collection(collection).doc(doc).remove();
}

// 查询记录
const querry = function(collection, querryItem) {

	// 查询参数querryItem，非必填
	let where = querryItem.where || {}
	let order = querryItem.order || ['addDate', 'desc']
	let skip = querryItem.skip || 0
	let limit = querryItem.limit || 20

	// 返回字段，默认只返回_id
	let field = querryItem.field || {
		'_id': true
	}
	return db.collection(collection).where(where).orderBy(order[0], order[1]).skip(skip).limit(limit).field(field).get();
}

// 查询集合记录数
const count = function(collection, where) {
	where = where || {}
	return db.collection(collection).where(where).count();
}

// 更新文档
const update = function(collection, doc, data) {
	return db.collection(collection).doc(doc).update(data);
}

// 更新文档(不存在则创建)
const set = function(collection, doc, data) {
	return db.collection(collection).doc(doc).set(data);
}

exports.main = async (event) => {

	// 解构event
	const {
		method,
		collection,
		data,
		doc,
		querryItem
	} = event

	switch (method) {
		case 'add':
			var result = add(data, collection);
			break;
		case 'remove':
			var result = remove(doc, collection);
			break;
		case 'querry':
			var result = querry(collection, querryItem);
			break;
		case 'count':
			var result = count(collection, where);
			break;
		case 'update':
			var result = update(collection, doc, data);
			break;
		case 'set':
			var result = set(collection, doc, data);
			break;
		default:
			break;
	}

	// 把查询结果返回给前端
	return result;
};
