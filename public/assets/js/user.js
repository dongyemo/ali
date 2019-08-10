$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {
        userAry = res
        render(userAry);
    }
})
function render(res) {
    let html = template('userTpl',{
        list:res
    })
    $('tbody').html(html);
}

$('#dataForm').on('submit', function() {
    $.ajax({
        type:'post',
        url:'/users',
        data:$(this).serialize(),
        success:function(result) {
            userAry.push(result)
            render(userAry);
        }
    })
    return false;
})

$('#avatar').on('change',function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
  
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData: false,
		contentType: false,
        success:function(res) {
            console.log(res);
            
           $('#preview').attr('src',res[0].avatar);
           $('#ava').val(res[0].avatar)           
        }
    })
})
//编辑用户功能/ 编辑用户功能 
$('tbody').on('click','.edit',function(){

    $('#userForm > h2').text('修改用户');

   // 先获取 当前被点击这个元素的祖先 叫tr 
    var trObj = $(this).parents('tr');

    // 获取图片的地址
    var imgSrc = trObj.children(1).children('img').attr('src');
    // 将图片的地址写入到隐藏域 
    $('#hiddenAvatar').val(imgSrc);
    // 如果imgSrc有值 我们
    if(imgSrc){
        $('#preview').attr('src',imgSrc);
    }else{
        $('#preview').attr('src',"../assets/img/default.png");
    }

    // 将对应的内容写入到左边的输入框里面
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    if(status == '激活'){
        $('#jh').prop('checked',true);
    }else{
        $('#wjh').prop('checked',true);
    }

    var role = trObj.children().eq(5).text();

    if(role == '超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);
    }

});



$('tbody').on('click','.edit',function() {
    $('#email').val($(this).parents('tr').children('td').eq(2).text());
    $('#nickName').val($(this).parents('tr').children('td').eq(3).text());
    
})