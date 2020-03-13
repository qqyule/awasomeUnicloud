module.exports = {
	/* unicloud的数据库操作函数封装
	 ** @method（必须） 增删改查方法add，remove, querry, count, update
	 ** @collection（必须） 数据库集合名称
	 ** @querry（可选） 其他参数，包括doc,where等
	 */
	db: function(method, collection, querry = {}) {
		uni.showLoading({
			title: '执行中'
		})

		// 解构querry
		const {
			data,
			doc,
			querryItem
		} = querry

		// 返回一个Promise
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: 'db',
				data: {
					method,
					collection,
					data: data || '',
					doc: doc || '',
					where: querryItem.where || '',
					order: querryItem.order || '',
					skip: querryItem.skip || '',
					limit: querryItem.limit || '',
					field: querryItem.field || ''
				},
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					console.log('err', err);
					reject(err);
				},
				complete: (res) => {
					uni.hideLoading()
				}
			})
		})
	},

	// unicloud上传
	upload: function(filePath) {
		uni.showLoading({
			title: '上传中'
		})
		return new Promise((resolve, reject) => {
			uniCloud.uploadFile({
				filePath: filePath,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					console.log('err', err);
					reject(err);
				},
				complete: (res) => {
					uni.hideLoading()
				}
			})
		})
	},

	// unicloud删除存储
	delete: function(fileID) {
		uni.showLoading({
			title: '删除中'
		})
		uniCloud.deleteFile({
			fileList: [fileID],
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				console.log('err', err);
				reject(err);
			},
			complete: (res) => {
				uni.hideLoading()
			}
		})
	}
}
