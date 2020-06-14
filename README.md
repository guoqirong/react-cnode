This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# react - cnode框架搭建


## 1.安装

npm install

## 2.运行

npm start

## 3.编译

npm run build

## 4.目录结构
```
|
├── public                 公开资源目录
|   ├── favicon.icon       title图标
|   ├── index.html         静态索引页面
|   └── 、、
├── src                    源码目录
|   ├── actions            redux里的actions
|   ├── assets             静态资源目录
|   ├── components         公共组件目录
|   ├── constants          常量设置目录
|   ├── reducers           redux里的reducers
|   ├── store              redux里的store
|   ├── utils              公共方法库
|   ├── view               页面文件目录
|   |   ├── index          index 页面目录
|   |   |   ├── index.js   index 页面逻辑
|   |   |   └── index.css  index 页面样式
|   ├── index.js           项目h5入口文件
|   ├── App.js             项目入口文件
|   └── serviceWorker.js   项目运行配置
├── package.json           资源包配置文件
└── README.md              项目说明
```

## 5.效果图


![首页](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/index.jpg)

![首页1](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/index1.jpg)

![登录](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/menu1.jpg)

![详情](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/detail.jpg)

![消息](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/message.jpg)

![收藏](https://github.com/guoqirong/taro-cnode/blob/master/demo-screenshot/collect.jpg)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
