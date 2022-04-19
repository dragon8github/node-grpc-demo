const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('hello.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

// grpc 加载包
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld

// ---------
console.log('init client')

// 创建客户端，连接 Hello 服务
const client = new hello_proto.Hello('127.0.0.1:55555', grpc.credentials.createInsecure())

// 调用 sayHello 方法
client.sayHello({
    // 按照 proto「message HelloReq」中的约定传参
    name: 'Lee', age:21
}, (err, response) => {
    if (err) return console.log(err)
    // 按照 proto「message HelloResp」中的约定返回
    const { message, code } = response
    // 服务端的返回信息
    console.log(message, code)
})