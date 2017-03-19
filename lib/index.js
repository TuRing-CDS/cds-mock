/**
 * Created by HC on 2017/3/7 0007.
 */
const fs = require('fs');
const Imock = require('mockjs');

class Mock{
    constructor(){
        this.info = {}
    }
    static checkType(JsonObj){
        if(JsonObj['type'] == 'string'){
            return Mock.Type_is_String(JsonObj);
        }
        if(JsonObj['type'] == 'integer'){
            return Mock.Type_is_Int(JsonObj)
        }
        if(JsonObj['type'] == 'boolean'){
            return Mock.Type_is_Boolean(JsonObj)
        }
    }

    static Type_is_String(JsonObj){
        let key, min, max = null;
        let value = '@';
        if('minLength' in  JsonObj){
            min = JsonObj['minLength']
        }else {
            min = 1
        }
        if('maxLength' in JsonObj){
            max = JsonObj['maxLength']
        }
        if(min!= null && max!= null){
            key = [JsonObj['_key_name_'], [min, max].join('-')].join('|');
        }else {
            key = [JsonObj['_key_name_'], min].join('|');
        }
        return [key, value]
    }

    static Type_is_Int(JsonObj){
        let key, minimum, maximum = null;
        let value = null;
        if('minimum' in JsonObj){
            minimum = JsonObj['minimum']
        }
        if('maximum' in JsonObj){
            maximum = JsonObj['maximum']
        }
        if(minimum != null && maximum != null){
            key = [JsonObj['_key_name_'], [minimum, maximum].join('-')].join('|');
            value = maximum
        }else if(minimum != null && maximum == null){
            key = [JsonObj['_key_name_'], '+1'].join('|');
            value = minimum
        }else if(minimum == null && maximum != null ){
            key = [JsonObj['_key_name_'], '+1'].join('|');
            value = maximum
        }else {
            key = [JsonObj['_key_name_'], '+1'].join('|');
            value = 202;
        }
        return [key, value]
    }

    static  Type_is_Boolean(JsonObj){
        let key = [JsonObj['_key_name_'], '1'].join('|');
        let value = true
        return [key, value]
    }


    mock(schema_path){
        let properties = schema_path['properties'];
        for(let key_name in properties){
            properties[key_name]['_key_name_'] = key_name;
            let result = Mock.checkType(properties[key_name]);
            this.info[result[0]] = result[1]
        }
        console.log(Imock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'id|+1': 512
        }));
        return Imock.mock(this.info)        }
}

module.exports = new Mock();