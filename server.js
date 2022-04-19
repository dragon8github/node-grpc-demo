const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('hello.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

// grpc 加载包（package helloworld）
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld

// 创建 server
const server = new grpc.Server()

// 添加服务，我们的服务名在 hello.proto 文件中定义的 service Hello
server.addService(hello_proto.Hello.service, {
    // 实现 sayHello 方法（是不是有点接口 interface 实现的味道）
    sayHello (call, cb) {
        try {
             /* call可以用来获取请求信息 */
             let { name, age } = call.request
             /* callback 可以用来向返回客户端信息，按照 proto「message HelloResp」中的约定返回 */
             cb && cb(null, {
                message: `用户名：${name}，年龄是：${age}`,
                code: 200
             })              
        } catch (err) {
            console.log('服务器出错', error)        
        }                                                      
    }
})

// 启动服务，设置端口
server.bind('127.0.0.1:55555', grpc.ServerCredentials.createInsecure())
server.start()
console.log('server start 127.0.0.1:55555...')