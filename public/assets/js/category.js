$('#addCategory').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success:function(res){
            console.log(res)
        }
    })
    //阻止表单默认提交
    return false;
})

//发送请求取得服务器端所有分类列表数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        console.log(res)
        //将服务端返回的数据和模板进行拼接
        var html = template('categoryListTpl',{data:res});
        $('#categoryBox').html(html);
    }
})



//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
        //alert('12')
      //在渲染的时候已经将id存在编辑按钮的自定义属性上  
      //获取要修改的分类数据的id
      var id = $(this).attr('data-id');

      //根据id获取分类数据的详细信息
      $.ajax({
          url:'/categories/'+id,
          type:'get',
          success:function(res){
            console.log(res)
            //template方法第二个参数是一个对象，返回值是拼接好的字符串
            //观察控制台打印的数据res本身就是一个对象
           var html = template('modifyCategorytp1',res);
           console.log(html)
           $('#formBox').html(html)
          }
      })
})


//当修改分类表单发生提交行为时
$('#formBox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize();
    //获取要修改的分类id
    var id = $(this).attr('data-id')
    $.ajax({
        url:'/categories/'+id,
        type:'put',
        data:formData,
        success:function(){
            location.reload();
        }
    })

    return false;
})

//当删除按钮被点击的时候
$('#categoryBox').on('click','.del',function(){
    if(confirm('确定删除数据吗')){
        var id = $(this).parent().children(0).attr('data-id');
        console.log(id)
        $.ajax({
            url:'/categories/'+id,
            type:'delete',
            success:function(res){
                location.reload();
            }
        })
    }
})
