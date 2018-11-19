---
title: django-resultfulapi-react-quick-start
date: 2017-03-19 21:49:22
tags: [React,django,restfulapi]
cover: cover.jpg
myexcerpt: 使用django restful api开发单页应用
---
准备写一个关于零食的采集站，筹划了好久，一直没有找到好的架构，最开始打算使用django来做。沿用CMS站的思路，将采集和编辑等价，然后发布和浏览，CMS系统一般带有一些auth相关的功能，可以节省不少开发时间，但是用django开始后就发现所有的页面还是要自己来写，速度太慢。UI上的问题也比较多，使用开源的UI基础组件可以拿来用，但是在页面组织上，引用template带来很多痛苦，数据传输和view绑在一起，view和model绑在一起，写了一段时间React之后，完全不想写这样的结构。
今天在Git上发现了django的restful项目，从django的view层直接输出json api，model层做数据的更新入库，前端则可以完全使用任何框架来编写，算是终于敲定了基础的架构，下面来介绍一下使用到的开源项目和搭建流程；
首先介绍一下选取的主要技术栈：
>前端：
`react,react-router,react-redux,whatwg-fetch`
>后端：
`django,djangorestframework`
>UI:
`ant design`

需要的开发环境：

`python2.7(stable),nodejs(v.6.2.0)`


首先搭设后台的工作环境：
`pip install django`
`pip install djangorestframework`

使用django开始一个新项目

`django-admin startproject sunakku`
`cd sunnakku`

在项目配置setting.py中增加djangoframwork相关的配置：

```python
INSTALLED_APPS = (
    ...
    'rest_framework',
)

REST_FRAMEWORK = {
    ...
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
```

增加URL路由规则（urls.py）:

```python
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

按照djangoframwork定义view层，此处的view层约等于modal层，也可以理解为是独立的业务层（views.py）:
以下采集自start tourial
```python
from django.shortcuts import render_to_response
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
```

好了，至此后端restful api搭建结束，来看一下效果：

`python manage.py migrate`
`python manage.py makemigrations`
`python manage.py createsuperuser`
`>vicvinc`
`>******`
`python manage.py runserver`
![ShowImage](/runserver.png) 

至此检验一下：
`
curl -H 'Accept: application/json; indent=4' -u vicvinc:****** http://127.0.0.1:8000/users/
`
![ShowImage](/curl.png)

无比的清爽，下面介绍一下熟悉的前端项目开发流程构建
项目结构：
![ShowImage](/fe.png)

关于使用npm管理前端项目的流程这里就不再介绍了，只介绍一下webpack的配置情况
```javascript

'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin')
var UglifyJsPlugin = require('./node_modules/webpack/lib/optimize/UglifyJsPlugin')
var plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.js',
		minChunks: 2
	}),
	new ExtractTextPlugin({
		filename: 'bundle.css',
		disable: false,
		allChunks: true
	}),
	new UglifyJsPlugin({
		comments: false,
		compress: {
			warnings: false
		}
	}),
	new HtmlWebpackPlugin({
		title: 'Sunakku',
		has: true,
		inject: true,
		chunks: ['app', 'vendor'],
		template: 'index.ejs'
	})
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("development")
        }
    }))
}

module.exports = {
	entry: {
		app: './src/index.jsx',
		vendor: ['react', 'react-router', 'react-redux', 'whatwg-fetch']
	},
	devServer: {
		contentBase: path.resolve(__dirname, './assets'),
		compress: true,
		port: 80,
		hot: true,
		inline: true,
		historyApiFallback: true
		// https: true
	},
	output: {
		path: path.resolve(__dirname, './assets/'),
		publicPath: '/',
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[hash].js'
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.css', '.scss', '.js', '.jsx']
	},
	module: {
		rules: [{
			test: /\.html$/,
			use: [{
				loader: 'file-loader'
			}]
		}, {
			test: /\.(js|jsx)$/,
			exclude: [/node_modules/],
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015'],
					plugins: ['transform-runtime', 'syntax-dynamic-import']
				}
			}]
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader',
				publicPath: '/assets/css/'
			})
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 5000,
					name: 'images/[hash].[ext]'
				}
			}]
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)\??.*$/,
			loader: 'url-loader',
			options: {
				name: 'fonts/[name].[hash].[ext]'
			}
		}]
	},
	plugins: plugins
	// externals: {
	//  'react': 'React',
	//  'react-dom': 'ReactDom'
	// }
};
```

至此，可以在`index.jsx`中写一个简单的ract demon测试一下，ok之后再继续，防止开发环境中缺失必要的依赖包，下面是我的依赖包清单：
`package.json`
```javascript
{
  "name": "snakku",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server -d --color"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.24.0",
    "babel-loader": "^6.4.1",
    "babel-plugin-dynamic-import": "^1.0.0",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.0",
    "babel-preset-react": "^6.23.0",
    "css-loader": "^0.27.3",
    "extract-text-webpack-plugin": "^2.1.0",
    "file-loader": "^0.10.1",
    "html-webpack-plugin": "^2.28.0",
    "sass-loader": "^6.0.3",
    "style-loader": "^0.14.1",
    "url-loader": "^0.5.8",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.4.2"
  },
  "dependencies": {
    "antd": "^2.8.2",
    "history": "^4.6.1",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-redux": "^5.0.3",
    "react-router": "^4.0.0",
    "redux": "^3.6.0",
    "semantic-ui-css": "^2.2.9",
    "semantic-ui-react": "^0.67.1",
    "whatwg-fetch": "^2.0.3"
  }
}
```
`PS：忽略semantic ui… 使用了semantic-ui的react组件之后发现，用不习惯，需要全局引用css样式，不是我喜欢的风格`

上述步骤需要`webpack-dev-server`来提供前端的开发环境，这里也不再介绍了…

然后引用几个aunt design的组件，来看看效果：
代码：
```javascript
import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';
import App from '../../component/mainNavgation.jsx'

class SunakkuCars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderList: []
        }
    }

    componentDidMount() {
        const bgColors = this.props.foodColor.split(';')
        const snacks = this.props.foodCate.split(';')
        const renderList = []
        /**
         * @desc generate 99 snacks
         */
        for (var i = 0, ii = 99; i < ii; i++) {
            var rColor = Math.floor(Math.random() * bgColors.length)
            var rCate = Math.floor(Math.random() * snacks.length)
            renderList.push({
                name: snacks[rCate],
                bgColor: bgColors[rColor]
            })
        }
        
        this.setState({
            renderList: renderList
        })
    }

    renderCards(snack) {
        const snackStyle = {
            height: 200,
            backgroundColor: snack.bgColor
        }
        return (
            <Col span={4}>
                <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                    <div className="custom-image">
                        <div className="image" style={snackStyle}>
                        </div>
                    </div>
                    <div className="custom-card">
                    <h3>{snack.name}</h3>
                    <p>我最喜欢吃的！</p>
                    </div>
                </Card>
            </Col>
        )
    }

    render() {
        return (
            <div className="ui main container">
                <App />
                <Row className="ui five cards">
                    {this.state.renderList.map(snack => {
                        return this.renderCards(snack)
                    })}
                </Row>
            </div>
        )
    }
}

SunakkuCars.defaultProps = {
    foodColor: '#ECD2E1;#ECE1D2;#D2E8EC;#D9D2EC;#7A858B;#FFFBCC;#FCF9D6;#F6F7F2;#F9AE74;#F8BD97',
    foodCate: '中式小吃;甜心糯米糍;琥珀核桃;可乐饼;牛肉干;凉粉;开口笑;年糕春卷;韭菜合子;荷叶船;心太软;枣糕;黄金芋球;糯米豆沙卷;烤玉米;土豆饼;凤梨酥;西式点心;泡芙;蒜蓉面包;炸香蕉;大理石蛋糕;蛋白棒;咖啡乳酪蛋糕;燕麦苹果玛芙;巧克力戚风蛋糕;法式热狗;葡式蛋塔;菠萝派;海绵小蛋糕;核桃饼干;草莓卷棍;椰子球;咖喱饺;水果饮品;莲心梨;柠檬茶;红酒佳人;草莓沙冰;姜撞奶;豆浆;甘草菊花茶;杏仁雪花糕;柚子蜂蜜茶;双层果冻;荔芋西米露;番茄梅子冰沙;银耳莲子羹;苹果茶;覆盆子果酒;珍珠奶茶;酱料冰点;玫瑰花糖;巧克力冰淇淋;卡士达酱;芒果酸奶冰;红豆沙;草莓果酱;香草冰淇淋;凤梨馅;醉酒樱桃;肉松;番茄酱;水果冰沙;异域美食;泥炉鸡;土豆泥;比萨;玉米沙拉;辣炒年糕;柠檬鸡'
}

export default SunakkuCars

```
然后运行开发环境的dev server
`npm run dev`
![ShowImage](/init-ui.png)


到目前为止整个结构算是搭建好了，下次继续写前端如何使用restful api搞事情 :)