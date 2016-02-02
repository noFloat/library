<?php
namespace Home\Controller;
use Think\Controller;
use Org\Util\Rbac;
class RootController extends BaseController {
    private $user;
    private $role;
    private $role_user;
    private $log;
    public function init(){//模板初始化
        $this->user = M('user');
        $this->role_user = M('role_user');
        $this->role = M('role');
        $this->log = M('log');
    }
    /**
    * @name index
    * @access root
    * @const 指明常量
    * @module Home
    * @param 
    * @return 渲染对应视图
    * @throws 
    * @todo 
    * @var $all_log所有日志分页，$wait_user待审核用户
    * @version 1.0
    */
    public function index(){
        $this->init();
        $all_user = $this->user
                    ->join('exam_role_user ON exam_user.id = exam_role_user.user_id')
                    ->join('exam_role ON exam_role_user.role_id = exam_role.id')
                    ->field('exam_user.id,exam_user.email,exam_user.createtime,exam_user.username,exam_role.name')
                    ->where("exam_user.status = 1 AND exam_user.username != 'root'")
                    ->select();
        $this->assign('all_user',$all_user);
        $all_wait_user = $this->user->where("status=0")->select();
        $this->assign('wait_user',$all_wait_user);
        $this->assign('goal',$goal);// 赋值数据集
        $count = $this->log->count();// 查询满足要求的总记录数$Page       
        $log= new \Think\Page($count,15);// 实例化分页类 传入总记录数和每页显示的记录数
        $log->lastSuffix=false;
        $log->setConfig('prev','上一页');
        $log->setConfig('next','下一页');
        $log->setConfig('last','末页');
        $log->setConfig('first','首页');
        $log->setConfig('theme','%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END% %HEADER%');
        $log_show = $log->show();// 分页显示输出
        $this->assign('log_cut',$log_show);// 赋值分页输出
        $all_log = $this->log->select();
        $this->assign('log',$all_log);
		$this->display('');
    }
    /**
    * @name changeRole
    * @access root
    * @const 指明常量
    * @module Home
    * @param $role更改角色,$user_id目标用户
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    ]
    * @throws 非法用户
    * @todo 
    * @var 
    * @version 1.0
    */
    public function changeRole(){
        $this->init();
        $condition_role = array(
            "name" => I('post.role')
        );
        $now_role = $this->role->where($condition_role)->field('id')->find();
        $condition = array(
                "user_id" => I('post.user_id')
            );
        $content = array(
            'role_id' => $now_role['id']
        );
        $goal = $this->role_user->where($condition)->data($content)->save();
        if($goal){
             $info = array(
                    "info"  => "更改成功",
                    "state" => "200",
                );
            echo json_encode($info);
        }else{
             $info = array(
                    "info"  => "更改失败",
                    "state" => 404,
                );
            echo json_encode($info);
        }
    }
    /**
    * @name changeRole
    * @access root
    * @const 指明常量
    * @module Home
    * @param $user_id目标用户
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    ]
    * @throws 非法用户
    * @todo 
    * @var 
    * @version 1.0
    */
    public function checkRole(){
        $this->init();
        $condition = array(
                "id" => I('post.user_id')
            );
        $content = array(
            'status' => 1
        );
        $goal = $this->user->where($condition)->data($content)->save();
        $add_content = array(
                'role_id' => 3,
                'user_id' => I('post.user_id')
            );
        $add_goal = $this->role_user->add($add_content);
        if($goal&&$add_goal){
             $info = array(
                    "info"  => "更改成功",
                    "state" => "200",
                );
            echo json_encode($info);
        }else{
             $info = array(
                    "info"  => "更改失败",
                    "state" => 404,
                );
            echo json_encode($info);
        }
    }

    public function _empty(){
        $this->display('404/index');
    }
}