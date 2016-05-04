<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {

    private $info404;
    private $info200;
	function _initialize(){
        if(!isset($_SESSION['username'])) {
            $this->redirect('login/index');exit;
        }
        $this->info200 = array(
                "info"  => "success",
                "state" => 200,
            );
        $this->info404 = array(
                "info"  => "failed",
                "state" => 404,
            );
    }

    public function index(){
        $this->display();
    }

    public function bookShow(){
        $this->display("Index/content");
    }

    public function amazon(){
        $this->display("Index/amazon");
    }

    public function searchBook(){
        if(I('post.book')==null){
            echo json_encode($this->info404);
        }else{
            $a = I('post.book');
            $condition = array(
                    'bookname' => array('like',"%$a%"),
                    'state'    => 1,
                );
            $book = M('book');
            $result = $book->where($condition)->select();
            if($result != null){
                $this->info200['data'] = $result;
                echo json_encode($this->info200);
            }else{
                echo json_encode($this->info404);
            }
        }
    }

    public function searchContent(){
    	$output = file_get_contents("http://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=search-alias%3Daps&field-keywords=".I('post.book'));
		//$pattern = "/<li id=\"result_([\s\S]*?)\/li>/";
        $pattern = "/<a class=\"a-link-normal s-access-detail-page  a-text-normal\" target=\"_blank\" title=\"(.*?)\" href=\"(.*?)\"><h2 class=\"a-size-base a-color-null s-inline s-access-title a-text-normal\">(.*?)<\/h2><\/a>/";
        $pattern = "/<a class=\"a-link-normal s-access-detail-page  a-text-normal\" target=\"_blank\" title=\"(.*?)\" href=\"(.*?)\">/";
        $result = $this->_patternGoal($pattern,$output);

        for($i = 0 ;$i<10;$i++){
            $goal[$i]['title'] = $result[1][$i];
            $goal[$i]['href'] = $result[2][$i];
        }
        if($goal != null){
            $this->info200['data'] = $goal;
            echo json_encode($this->info200);
        }else{
            echo json_encode($this->info404);
        }
		//$this->display('Index/index');
    }


    private function objectToArray($e){
	    $e=(array)$e;
	    foreach($e as $k=>$v){
	        if( gettype($v)=='resource' ) return;
	        if( gettype($v)=='object' || gettype($v)=='array' )
	            $e[$k]=(array)$this->objectToArray($v);
	    }
	    return $e;
	}
	/**
    * @name curl_init
    * @access 
    * @const 指明常量
    * @module Home
    * @param $url目标url，$data参数
    * @return 
    * @throws 接口服务器出错
    * @todo 
    * @var 
    * @version 1.0
    */
    private function curl_init($url,$data){//初始化目标网站
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt ($ch, CURLOPT_POSTFIELDS,$data);
        $output = curl_exec($ch);
        return $output;
    }

    private function _patternGoal($pattern,$string){//匹配函数
        preg_match_all($pattern,$string,$goalarray);
        return $goalarray;
    }

    public function destory(){
    	session(null);
    	$this->redirect('Login/index');
    }

    public function _empty() {
        $this->display('404/index');
    }
}

