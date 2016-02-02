<?php

namespace Home\Controller;
use Think\Controller;
use Org\Util\Rbac;

/**
*权限审核，没有权限，会弹窗，没有登陆，就到登陆页面，并将权限存储到session中
* @name BaseController
* @access 继承类
* @author 丛广林 304546210@qq.com
* @const USER_ATU_KEY => username session标识符
* @global MODULE_NAME ACTION_NAME
* @module Home
* @return true or false
* @todo 继承类过于简单，只有审核权限，其他的公用方法可以在该类重写
* @staic AccessDecision RBAC常量方法
* @version 1.0
*/
class BaseController extends Controller {
    function _initialize(){
        if(!isset($_SESSION[C('USER_AUTH_KEY')])&&$_SESSION['username'] == null) {
            $this->redirect('login/index');exit;
        }
        $notAuth = in_array(MODULE_NAME, explode(',', C('NOT_AUTH_MODULE'))) || in_array(ACTION_NAME, C('NOT_AUTH_ACTION'));
        //权限验证
        if(C('USER_AUTH_ON') && !$notAuth) {
            RBAC::AccessDecision('HOME') || $this->error("你没有权限",U("Index/index"));
        }
    }
}