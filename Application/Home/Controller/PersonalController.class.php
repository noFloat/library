<?php
namespace Home\Controller;
use Think\Controller;
use Org\Util\Rbac;
class PersonalController extends Controller {

    function _initialize(){
        if(!isset($_SESSION['username'])) {
            $this->redirect('login/index');exit;
        }
    }

    public function index(){
		$this->display('');
    }
    /**
    * @name change
    * @access 
    * @const 指明常量
    * @module Home
    * @param $mail邮箱，$phone电话
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    ]
    * @throws 非法用户
    * @todo 
    * @var 
    * @version 1.0
    */
    public function change(){
        $student = M('student');
        $condition = array(
                'stu_id' => session('stu_id'),
            );
        $content = array(
                "mail" => I('post.mail'),
                "phone"  => I('post.phone')
            );
        $goal = $student->where($condition)->data($content)->save();
        if($goal){
            $info = array(
                "info"  => "修改成功",
            );
            echo json_encode($info);
        }else{
            $info = array(
                "info"  => "修改失败",
            );
            echo json_encode($info);
        }
    }

    public function showPWD(){
        $this->display('Personal/change');
    }
    /**
    * @name changePWD
    * @access 
    * @const 指明常量
    * @module Home
    * @param $user_name用户标识符,$user_id目标用户
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    ]
    * @throws 非法用户
    * @todo 
    * @var salt随机数字盐
    * @version 1.0
    */
    public function changePWD(){
        if(session('type') == null){
            $user = M('user');
            $condition = array(
                "username" => session('username'),
            );
            $goal = $user->where($condition)->find();
        }else{
            $user = M('student');
            $condition = array(
                "stu_id" => session('stu_id'),
            );
            $goal = $user->where($condition)->find();
        }
        if(strlen(I('post.now'))<6){
            $info = array(
                "info"  => "密码长度过短",
                "state" => 404
            );
            echo json_encode($info);
        }else if(md5(hash('sha256', ($goal['salt'] % 3))).sha1(I('post.origin')) != $goal['password']){
            $info = array(
                "info"  => "原密码输入错误",
                "state" => 404
            );
            echo json_encode($info);
        }else if(I('post.now') != I('post.changenow')){
            $info = array(
                "info"  => "修改密码不一致",
                "state" => 404
            );
            echo json_encode($info);
        }else{
            $content = array(
                "password" => md5(hash('sha256', ($goal['salt'] % 3))).sha1(I('post.now'))
            );
            $user->where($condition)->data($content)->save();
            $info = array(
                "info"  => "修改成功",
                "state" => 200
            );
            echo json_encode($info);
        }
    }

    public function _empty(){
        $this->display('404/index');
    }
}