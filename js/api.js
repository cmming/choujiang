// 所有的接口数据

function request(url, data, success) {
    $.ajax({
        type: 'get',
        url: url,
        data: data,
        success: success,
    });
}

// list
// var choujiang = {
//     list: request('./chouJiang/data', {}, function(data) {
//         console.log(data)
//     }),
//     add: request('./chouJiang/data/save', function(data) {
//         console.log(data)
//     })
// }