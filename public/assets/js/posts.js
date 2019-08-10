//向服务器拿文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
        console.log(res)
       var html =   template('posts-tpl',{data:res});
       $('#posts-tpl1d').html(html);
    }
})

//处理日期时间格式
function formateDate(date){
    //将日期时间字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth() + 1) + '-'+date.getDate();
}