## TuRing-CDS

### cds-mock

### How to use

    npm install cds-mock --save

### Example

#### schema.json

    {
        "title":"user",
        "properties":{
            "id":{
                "description":"The unique identifier for user",
                "type":"integer"
            },
            "userName":{
                "description":"Name of the user",
                "type":"string",
                "minLength":"6",
                "maxLength":"12"
            },
            "nickName":{
                "description":"NickName of the user",
                "type":"string",
            }
        },
        "required":["id","userName"]
    }
    
#### Test.js

    const Mock = require('cds-mock')
    
    const schema = require('./schema.json');
    
    Mock.mock(schema)
    
    => { id: 10001, userName:"xxaegxgxg", nickName: "乱七八糟啥的"}