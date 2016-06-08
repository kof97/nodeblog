# `node` `angular.js` 搭建的博客 （`gulp` && `browserify`）

---

> 运行之前要确定你安装了 `node`、`mongoDB`

首先，把项目克隆到本地

> git clone git@github.com:kof97/nodeblog.git

接下来，安装所需依赖

> npm install

接下来，启动 `mongoDB` 服务

`dbpath` 为你的数据目录，我的是 `D:\data\db`

或者提前写好 `mongo.config` 配置文件

> mongod --dbpath D:\data\db

然后进入到 `bin` 目录下，开启服务

> node www

ok，现在访问 `127.0.0.1:3000` 就行了

---