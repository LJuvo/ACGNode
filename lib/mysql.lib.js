let util = require('util');
let mysql = require('mysql');
var databaseConfig = require('../config/mysql.config');
var commonUtil = require('../lib/util.lib');

var pool  = mysql.createPool( {
    connectionLimit : 50,
    host : databaseConfig.host,
    user : databaseConfig.user,
    password : databaseConfig.password,
    database : databaseConfig.database,
    multipleStatements : true  //是否允许执行多条sql语句
} );
//将结果已对象数组返回
var row=( sql , params = '' )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//返回一个对象
var first=( sql , params = '' )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res[0] || null );
            });
        });
    });
};
//返回单个查询结果
var single=(sql , params = '' )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject( error );
                    return;
                }
                for( let i in res[0] )
                {
                    resolve( res[0][i] || null );
                    return;
                }
                resolve(null);
            });
        });
    });
}
//执行代码，返回执行结果
var execute = (sql , params = '' )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res );
            });
        });
    });
}
var sqlDo = ( sql, params = '')=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res );
            });
        });
    });
}
var findOne = ( table, where, params = '')=>{
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }
      
        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string' && !commonUtil.isEmpty(where)){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT * FROM "+databaseConfig.prefix+table+' '+_WHERE+' LIMIT 1';
    // console.log(sql);
    return sqlDo( sql, params);
}
var findAll = ( table, where, order='createTime', sort='desc', params = '')=>{
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }
      
        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string' && !commonUtil.isEmpty(where)){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT * FROM "+databaseConfig.prefix+table+' '+_WHERE+' ORDER BY '+order+' '+sort;
    return sqlDo( sql, params);
}
var groupBy = ( table, where, fields='*', groupName, order='createTime', sort='desc', params = '')=>{
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }
      
        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string' && !commonUtil.isEmpty(where)){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT "+fields+" FROM "+databaseConfig.prefix+table+' '+_WHERE+' GROUP BY '+groupName+' ORDER BY '+order+' '+sort;
    return sqlDo( sql, params);
}
var countAll = ( table, where, order='createTime', sort='desc', params = '')=>{
    var _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }
      
        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string' && !commonUtil.isEmpty(where)){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT count(*) FROM "+databaseConfig.prefix+table+' '+_WHERE+' ORDER BY '+order+' '+sort;
    return sqlDo( sql, params);
}
var insert = ( table, obj, params = '')=>{
    var fields='';
    var values='';
    for( var k in obj){
        fields+=k+',';
        values=values+"'"+obj[k]+"',"
    }
    fields=fields.slice(0,-1);
    values=values.slice(0,-1);
    var sql="INSERT INTO "+databaseConfig.prefix+table+' ('+fields+') VALUES ('+values+')';
    console.log(sql);
    return sqlDo( sql, params);
}
var update = ( table, sets, where, params = '')=>{
    var _SETS='';
    var _WHERE='';
    var keys='';
    var values='';
    for(var k in sets){
        _SETS+=k+"='"+sets[k]+"',";
    }
    _SETS=_SETS.slice(0,-1);
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
    }
    
    _WHERE=_WHERE.slice(0,-4);
    //update table set username='admin2',age='55'   where id="5";
    var sql="UPDATE "+databaseConfig.prefix+table+' SET '+_SETS+' WHERE '+_WHERE;
    // console.log(sql);
    return sqlDo( sql, params);
}
var del = ( table, where, params = '')=>{
    var _WHERE='';
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
    }
    
    _WHERE=_WHERE.slice(0,-4);
    if(!commonUtil.isEmpty(_WHERE)){
        _WHERE = ' WHERE '+_WHERE;
    }
    var sql="DELETE  FROM "+ databaseConfig.prefix+table+ _WHERE;
    return sqlDo( sql, params);
}
var page = ( table, where, current_page = 1, num=1, order='Id', sort='asc', params = '')=>{
    if (current_page <= 1) {
        current_page = 1;
    }
    var _WHERE='';
    for(var k2 in where){
        _WHERE+=k2+"='"+where[k2]+"' AND ";
    }
    
    _WHERE=_WHERE.slice(0,-4);
    if(!commonUtil.isEmpty(_WHERE)){
        _WHERE = ' WHERE '+_WHERE;
    }
    _WHERE += ' ORDER BY '+order+' '+sort;
    var sql = "SELECT * FROM "+databaseConfig.prefix+table+' '+_WHERE+" limit " + num + "  offset " + num * (current_page - 1);
    console.log(sql);
    return sqlDo( sql, params);
}
//模块导出
module.exports = {
    ROW     : row ,
    FIRST   : first ,
    SINGLE  : single ,
    EXECUTE : execute ,
    INSERT  : insert,
    FindOne : findOne,
    UPDATE  : update,
    DELETE  : del,
    FindAll : findAll,
    PAGE    : page,
    COUNT   : countAll,
    GROUPBY : groupBy  
}