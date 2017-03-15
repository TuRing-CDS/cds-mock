/**
 * Created by HC on 2017/3/7 0007.
 */
const fs = require('fs');
const Imock = require('mockjs');

class Mock{
    constructor(){
        this.info = {}
    }
    checkType(JsonObj){
        if(JsonObj['type'] == 'string'){
            this.Type_is_String(JsonObj);
            return
        }
    }

    Type_is_String(JsonObj){
        var key, min, max = '';
        var value = '@';
        if('minLength' in  JsonObj){
            min = JsonObj['minLength']
        }else {
            min = 1
        }
        if('maxLength' in JsonObj){
            max = JsonObj['maxLength']
        }
        if(min!='' && max!=''){
            key = [JsonObj['_key_name_'], [min, max].join('-')].join('|');
        }else {
            key = [JsonObj['_key_name_'], min].join('|');
        }
        this.info[key] = value
    }

    mock(schema_path){
        let properties = schema_path['properties'];
        for(let key_name in properties){
            properties[key_name]['_key_name_'] = key_name;
            this.checkType(properties[key_name]);
            }
            return Imock.mock(this.info)
        }

        // console.log(Imock.mock({
        //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        //     'id|+1': 202,
        //     'name|1-3': '@@@'
        //
        // }))



}

module.exports = new Mock();