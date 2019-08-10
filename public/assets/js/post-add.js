//获取文章数据在下拉列表中显示
$.ajax({
    
    url:'/categories',
    type:'get',
    success:function(res){
        //console.log(res)
        let html = template('categorytpl',{data:res});
        $('#category').html(html)
    }
})

//当管理员选择文件时触发事件
$('#feature').on('change',function(){
    //文件选择事件可以一次 选择一个文件也可以一次选择多个，但无论是一个还是多个，文件都被存储在数据集合之中
    //获取到管理员选择的文件
    var file = this.files[0];
    //图片文件上传,图片文件属于二进制文件，不可以直接传递到ajax之中
    //创建formData对象实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件追加到formdata对象中，并且起名为cover
    formData.append('cover',file)

    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉$.ajax方法不要处理data属性对应的参数
        processData:false,
        //告诉ajax方法不要设置参数类型
        contentType:false,
        success:function(res){
            //console.log(res)
            //打印后res观察得知地址保存在数组中的cover属性下
            //获取图片地址保存在隐藏域中
            $('#thumbnail').val(res[0].cover);
        }
    })
})


//当添加文章表单提交的时候
$('#addForm').on('submit',function(){
    //获取在表单中输入的信息
    var formData = $(this).serialize();
    //向服务器端发送请求实现添加文章功能
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(res){
            console.log(res)
            //添加成功跳转到文章列表页面
            location.href='/admin/posts.html'
        }
    })
    return false;
})