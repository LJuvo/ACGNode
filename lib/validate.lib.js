module.exports = function (Vue, options) {
    
    
    /**
     * 注意:  定义type 规则时 不用做非空验证 
     *        只需要传入 required:true 即可
     * */
    /*保留两位小数*/
    const isvalidateMoney = (value, callback) => {
        if(value != null && value != "") {
            if(!validateMoneyNumber(value)) {
            callback(new Error('请输入正确的数字，最多保留两位小数!'))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
    /*验证QQ号码*/
    const isvalidateQQ= (value, callback) => {        
        if(value != null && value != "") {
            if(!qq(value)) {
                callback(new Error('您输入的QQ号不正确!'))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
    /*验证手机号*/
       const isvalidateMobile= (value, callback) => {        
        if(value != null && value != "") {
            if(!mobile(value)) {
                callback(new Error('您输入的手机号不正确!'))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
       
       /*含有非法字符(只能输入字母、汉字)*/
       const isvalidateRegexn= (value, callback) => {        
        if(value != null && value != "") {
            if(!regexn(value)) {
                callback(new Error('含有非法字符(只能输入字母、汉字)!'))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
        /*请输入正整数*/
       const isvalidateInteger= (value, callback) => {        
        if(value != null && value != "") {
            if(!integer(value)) {
                callback(new Error('请输入正整数!'))
            } else {
                callback()
            }
        }
        else{
            callback();
        }
    }
    
    
};