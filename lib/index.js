/**
 * Created by HC on 2017/3/7 0007.
 */
const fs = require('fs');
const Imock = require('mockjs');

class Mock{
    constructor(){
    }
    mock(schema_path){
        let properties = schema_path['properties'];
        for(let key_name in properties){
            console.log(properties[key_name])
        }
        console.log(Imock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        }))
    }


}

module.exports = new Mock();