## 目的

方便自己日常使用unicloud操作数据库和存储

#### 适用于：uniapp开发小程序和H5，APP端未验证

## 云函数

- cloudfunctions-aliyun\db\index.js 封装数据库操作函数，包括增删改查


## 函数

- common.js 本地封装函数，暴露db,upload函数

## 调用方式
### 查询
```javascript
querryData: async function() {
  // 从集合（users）查询（querry）所有记录
  const res = await this.common.db('querry', 'users')
  if (res) {
    this.users = res.result.data
  }
  // res.result.data为数据库真实数据
}
```
### 删除
```javascript
removeData: async function(_id) {
  // 从集合（users）删除（remove）记录（doc）
  const res = await this.common.db('remove', 'users', {
    doc: _id
  })
}
```
### 增加
```javascript
addDate: async function(e) {
  // e是表单传入数据
  // 增加(add)记录（data）到集合(users)
  const res = await this.common.db('add', 'users', {
    data: e.detail.value
  })
}
```
### 按条件查询
```javascript
querryData: async function() {

  querryItem = {
    where = {
      name: 'abc'
    },
    order = ['addDate', 'asc']
    skip = 0
    limit = 10
    field = {
    '_id': true,
    'name': true
  	}
  }

  // 从集合（users）查询（querry）所有符合querryItem条件的记录
  const res = await this.common.db('querry', 'users', querryItem)
  if (res) {
    this.users = res.result.data
  }
  // res.result.data为数据库真实数据
}
```