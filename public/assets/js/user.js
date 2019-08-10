// import { resolvePtr } from "dns";

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

//删除功能
$('tbody').on('click','.delete',function(){
    //弹窗提示
    if(confirm('确定删除吗')){
        var id = $(this).parent().attr('data-id');
        //console.log(id)
        $.ajax({
            type: 'delete',
            url: '/users/'+id,
            success:function(res){
           
            }
        })
    }
})

  //获取批量删除按钮
 
//全选功能
$('#selectAll').on('change',function(){
    //获取当前按钮的状态
    let status = $(this).prop('checked');

  
    //批量删除按钮的显示和隐藏
    if(status){
        $('.btn-sm').show();
    }else{
        $('.btn-sm').hide();
    }
    //把当前按钮的状态给所有的子项
    $('#userBox').find('input').prop('checked',status);

})
//给下方的复选框注册点击事件
$('tbody').on('click','input',function(){
    //如果下方复选框的个数，等于其下面被选中复选框个数，代表都被选中,那么久改变全选框
    if($('tbody input').length == $('tbody input:checked').length){
        $('thead input').prop('checked',true);
    }else{
        $('this input').prop('checked',false);
    }



})

//当用户复选框状态发生改变
$('.userBox').on('change','userStatus',function(){
    var inputs = $('#userBox').find('input');
    if(inputs.length == inputs.fliter(':checked').length){
        alert('所有用户都被选中');
    }else{
        alert('不是所有用户都被选中')
    }
})

//给批量删除按钮注册点击事件
$('.btn-sm').on('click',function(){
    var ids = [];
    // 想要获取被选中的元素的id属性值 
    var checkUser = $('tbody input:checked');
    // 对checkUser对象进行遍历
    checkUser.each(function (k, v) {
      var id = v.parentNode.parentNode.children[6].getAttribute('data-id');
      ids.push(id);
    });

    // 发送ajax
    $.ajax({
      type: 'delete',
      url: '/users/' + ids.join('-'),
      success: function (res) {
        // res是这一个数组 数组里面放的被删除的元素 元素是一个对象 
        // res.forEach(e => {
        //   var index = userArr.findIndex(item => item._id == e._id);
        //   // 调用splice()
        //   userArr.splice(index, 1);
        //   render(userArr);
        // })

        location.reload();

      }
    })

})





