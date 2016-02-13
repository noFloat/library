<?php
namespace Home\Controller;
use Think\Controller;
class ExcelController extends Controller {



    public function index(){
    	$this->display('');
    }

    public function showExcel(){
    	$book = M('book');
    	$goal_id = explode('|',I('post.booknum'));
    	array_shift($goal_id);
    	$num = count($goal_id);
    	$last_goal = array();
    	for($i = 0;$i<$num;$i++){
    		$condition = array(
    			'id' => $goal_id[$i]
    		);
    		$goal_book = $book->where($condition)->field(
    			'id,bookname,purchingtime,num,pubhouse,auth'
    			)->find();
    		array_push($last_goal,$goal_book);
    	}
    	$str = "id,书名,购买时间,数量,出版社,作者\n";   
	    $str = iconv('utf-8','gb2312',$str);   
	    for($i=0;$i<$num;$i++){
	    	$middle .= implode(",",$last_goal[$i])."\n";
	    }    
	    $filename = date('Ymd').rand().'.csv'; //设置文件名  
	    $middle = iconv('utf-8','gb2312',$middle);
	    header("Content-type:text/csv");   
	    header("Content-Disposition:attachment;filename=".$filename);   
	    header('Cache-Control:must-revalidate,post-check=0,pre-check=0');   
	    header('Expires:0');   
	    header('Pragma:public');   
	    echo $middle;   
    }

    public function export(){
    	$this->display('');
    }

    public function import(){  
    	$upload = new \Think\Upload();
		$upload->maxSize = 0;
		$upload->exts = array('xls', 'xlsx');
		$upload->rootPath  =  "./Public/Excel/";
		$upload->saveName = time().'_'.mt_rand();
		$upload->autoSub = false;
	    $a = $upload->upload();
        if($upload->getError() != null){
            $this->error($upload->getError());
        }
    	import("Org.Util.PHPExcel");
		//要导入的xls文件，位于根目录下的Public文件夹
		$filename="./Public/Excel/".$upload->saveName.".".$a['excel']['ext'];
		//创建PHPExcel对象，注意，不能少了\
		$PHPExcel=new \PHPExcel();
		//如果excel文件后缀名为.xls，导入这个类
        if($a['excel']['ext'] == 'xls'){
            import("Org.Util.PHPExcel.Reader.Excel5");
            $PHPReader=new \PHPExcel_Reader_Excel5();
        }else{
            import("Org.Util.PHPExcel.Reader.Excel2007");
            $PHPReader=new \PHPExcel_Reader_Excel2007();
        }
		$PHPExcel=$PHPReader->load($filename);
		//获取表中的第一个工作表，如果要获取第二个，把0改为1，依次类推
		$currentSheet=$PHPExcel->getSheet(0);
		//获取总列数
		$allColumn=$currentSheet->getHighestColumn();
		//获取总行数
		$allRow=$currentSheet->getHighestRow();
        if($allColumn!='D'){
            $this->error("导入文件格式有误");
        }
		//循环获取表中的数据，$currentRow表示当前行，从哪行开始读取数据，索引值从0开始
		$sql_standard = array(
				A => "bookname",
				B => "num",
				C => "pubhouse",
				D => "auth",
			);
		for($currentRow=0;$currentRow<=$allRow;$currentRow++){
			//从哪列开始，A表示第一列
			for($currentColumn='A';$currentColumn<=$allColumn;$currentColumn++){
				//数据坐标
				$address=$currentColumn.$currentRow;
				//读取到的数据，保存到数组$arr中
				$arr[$currentRow][$sql_standard[$currentColumn]]=$currentSheet->getCell($address)->getValue();
			}
		
		}
		array_shift($arr);
		$excel =  M('book');
		$num = count($arr);
        $restnum = 0;
        foreach($arr as $key => $value){
        	$condition = array(
        			"bookname" => $arr[$key]['stu_id'],
        		);
            $value['purchingtime'] = date("Y-m-d", time());
        	$output = $excel->where($condition)->find();
        	//var_dump($output);
        	if($output){
                $resttime += 1;
            	$goal = $excel->where($condition)->data($value)->lock(true)->save();//悲观锁
        	}else{
        		$goal = $excel->add($value);
        	}
        }	
        if($goal){
        	$info = array(
        		"info"  => "success",
                "state" => 200,
        	);
            // $all_student = $excel->select();
            // foreach ($all_student as $key => $student_value) {
            //     S($student_value['stu_id'],$student_value);
            // }
            // S('stu',1);
            $log = D('Log');
            $log->addLog('导入学生');
            $this->success("添加成功,重复数目为".$restnum);
        }else{
        	$info = array(
                    "info"  => "failed",
                    "state" => 404,
            );
            $this->error("添加失败或数据库无更新");
        }
    }
    public function searchBook(){
        $book = M('book');
        // if(S('stu') == null){
        //     $all_student = $book->select();
        //     foreach ($all_student as $key => $value) {
        //         S($value['stu_id'],$value);
        //     }
        //     S('stu',1);
        // }
        $postbook = I('post.bookname');
    	if($postbook!=null){
    		// $goal_student = S(I('post.stunum'));
            $condition = array(
                    "bookname" => array('like',"%$postbook%"),
                    "num" => array('gt',"0"),
                );
            $goal_book = $book->where($condition)->field('id,bookname,purchingtime,num,pubhouse,auth')->select();
            $goal_studentnow = $goal_book;
            if(!$goal_book){
                $info = array(
                        "info"  => "failed",
                        "state" => 404,
                    );
                echo json_encode($info);exit;
            }else{
                $info = array(
                        "info"  => "success",
                        "state" => 200,
                        "data"  => $goal_studentnow,
                    );
                echo json_encode($info);exit;
            }
    	}
    	if(I('post.id')!=null){
    		$condition['id'] = I('post.id');
    	}else{
            $info = array(
                    "info"  => "请输入书名",
                    "state" => 404,
                );
            echo json_encode($info);exit;
        }
    	$goal_book = $book->where($condition)->find();
    	if(!$goal_book){
    		$info = array(
                    "info"  => "failed",
                    "state" => 404,
                );
            echo json_encode($info);
    	}else{
    		$info = array(
                    "info"  => "success",
                    "state" => 200,
                    "data"  => $goal_book,
                );
            echo json_encode($info);
    	}
    }


    public function update(){
        $book = M('book');
        $content = array(
                "bookname" => I('post.bookname'),
                "num"      => I('post.num'),
                "pubhouse" => I('post.pubhouse'),
                "auth"     => I('post.auth'),
            );
        $condition = array(
                "id" => I('post.id')
            );
        $goal = $book->where($condition)->data($content)->save();
        if(!$goal){
            $info = array(
                    "info"  => "failed",
                    "state" => 404,
                );  
            echo json_encode($info);
        }else{
            $info = array(
                    "info"  => "success",
                    "state" => 200,
                );
            echo json_encode($info);
        }
    }

    public function addAnnex(){
        $upload = new \Think\Upload();
        $upload->maxSize = 0;
        $upload->exts = array('docx', 'doc',"zip");
        $upload->rootPath  =  "./Public/Annex/";
        $upload->saveName = time().'_'.mt_rand();
        $upload->autoSub = false;
        $a = $upload->upload();
        if($upload->getError() != null){
            $this->error($upload->getError());
        }
        $annex = M('annex');
        $content = array(
                "username" => session('username'),
                "date"     => date("Y-m-d H:i:s", time()),
                "title" => I('post.title'),
                "position" => "./Public/Annex/".$upload->saveName.".".$a['fold']['ext'],
                'state'    => 1
            );
        $goal = $annex->where($condition)->add($content);
        if($goal){
            $log = D('Log');
            $log->addLog('添加附件');
            $this->success("添加成功");
        }else{
            $log = D('Log');
            $log->addLog('添加附件失败');
            $this->error("添加失败");
        }
    }

    public function addOne(){
        $salt = mt_rand(10,200000);
        $content = array(
            'bookname'     => I('post.addone_bookname'),
            'num'          => I('post.addone_num'),
            'pubhouse'     => I('post.addone_pubhouse'),
            'auth'         => I('post.addone_auth'),
            'purchingtime' => date("Y-m-d H:i:s", time()),
        );
        if(in_array("",$content) != 0){
            $info = array(
                    "info"  => "请保证数据无空值",
                    "state" => 404,
                );
            echo json_encode($info);exit;
        }
        // foreach($content as $key => $value){
        //     if($value = null){
        //         $info = array(
        //             "info"  => "请保证数据无空值",
        //             "state" => 404,
        //         );
        //         echo json_encode($info);
        //     }
        // }
        $book = M('book');
        $condition = array(
                "bookname" => I('post.addone_bookname')
            );
        $goal_book = $book->where($condition)->find();
        if($goal_book){
            $info = array(
                    "info"  => "该书已存在，添加失败",
                    "state" => 404,
                );
            echo json_encode($info);
        }else{
            $book->add($content);
            $info = array(
                "info"  => "添加成功",
                "state" => 200,
            );
            echo json_encode($info);
        }
    }

    public function showPort(){
        $this->display("Excel/port");
    }

    public function _empty() {
        $this->display('404/index');
    }
}

