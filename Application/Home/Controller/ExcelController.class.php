<?php
namespace Home\Controller;
use Think\Controller;
/**
* @name Excel
* @access 教务处、root
* @author 丛广林
* @const 指明常量
* @module Home
* @throws linux 未设置public文件夹中Excel和Csv文件夹权限会报错
* @version 1.0
*/
class ExcelController extends BaseController {



    public function index(){
    	$this->display('');
    }

    /**
    * @name showExcel
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param stunum传入学号为,,分割的字符串
    * @return 返回csv文件
    * @throws linux 未设置Public文件夹中Excel和Csv文件夹权限会报错
    * @todo 前端未作ajaxform，用户体验想对一般
    * @var 定义说明变量/属性。
    * @version 1.0
    */
    public function showExcel(){
    	$student = M('student');
    	$goal_id = explode(',',I('post.stunum'));
    	array_shift($goal_id);
    	$num = count($goal_id);
    	$last_goal = array();
    	for($i = 0;$i<$num;$i++){
    		$condition = array(
    			'stu_id' => $goal_id[$i]
    		);
    		$goal_student = $student->where($condition)->field(
    			'stu_name,stu_id,sex,class_id,idcard,province,mail,phone'
    			)->find();
    		array_push($last_goal,$goal_student);
    	}
    	$str = "姓名,学号,性别,班级,身份证号,省份,邮箱,电话\n";   
	    $str = iconv('utf-8','gb2312',$str);   
	    $student = M('student');
	    $str = $student->select();
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
    /**
    * @name import
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param 传入xlsx或xls文件
    * @return 
    * @throws linux 未设置Public文件夹中Excel和Csv文件夹权限会报错
    * @todo 前端未作ajaxform，用户体验想对一般；文件大小未设置限制，需上线后考虑
    * @var phpExcel实例化phpexcel插件
    * @version 1.0
    */
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
		//循环获取表中的数据，$currentRow表示当前行，从哪行开始读取数据，索引值从0开始
		$sql_standard = array(
				A => "stu_name",
				B => "stu_id",
				C => "sex",
				D => "class_id",
				E => "idcard",
				F => "province",
			);
		for($currentRow=1;$currentRow<=$allRow;$currentRow++){
			//从哪列开始，A表示第一列
			for($currentColumn='A';$currentColumn<=$allColumn;$currentColumn++){
				//数据坐标
				$address=$currentColumn.$currentRow;
				//读取到的数据，保存到数组$arr中
				$arr[$currentRow][$sql_standard[$currentColumn]]=$currentSheet->getCell($address)->getValue();
			}
		
		}
		array_shift($arr);
		$excel =  M('student');
		$num = count($arr);
        foreach($arr as $key => $value){
        	$condition = array(
        			"stu_id" => $arr[$key]['stu_id'],
        		);
            $salt = mt_rand(10,200000);
            $value['salt'] = $salt;
            $value['password'] = md5(hash('sha256', ($salt % 3))).sha1(substr($value['idcard'],-6));
        	$output = $excel->where($condition)->find();
        	//var_dump($output);
        	if($output){
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
            $all_student = $excel->select();
            foreach ($all_student as $key => $student_value) {
                S($student_value['stu_id'],$student_value);
            }
            S('stu',1);
            $log = D('Log');
            $log->addLog('导入学生');
            $this->success("添加成功");
        }else{
        	$info = array(
                    "info"  => "failed",
                    "state" => 404,
            );
            $this->error("添加失败");
        }
    }

    /**
    * @name searchStudent
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param stunum=>学号,class_id=>班级号,province=>省份
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    "data"  => $goal_student,
                    ]
    * @throws 
    * @todo 
    * @var 
    * @version 1.0
    */
    public function searchStudent(){
        $student = M('student');
        if(S('stu') == null){
            $all_student = $student->select();
            foreach ($all_student as $key => $value) {
                S($value['stu_id'],$value);
            }
            S('stu',1);
        }
    	if(I('post.stunum')!=null){
    		$goal_student = S(I('post.stunum'));
            $goal_studentnow[0] = $goal_student;
            if(!$goal_student){
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
    	if(I('post.classid')!=null){
    		$condition['class_id'] = I('post.classid');
    	}
    	if(I('post.province')!=null){
    		$condition['province'] = I('post.province');
    	}
    	$goal_student = $student->where($condition)->select();
    	if(!$goal_student){
    		$info = array(
                    "info"  => "failed",
                    "state" => 404,
                );
            echo json_encode($info);
    	}else{
    		$info = array(
                    "info"  => "success",
                    "state" => 200,
                    "data"  => $goal_student,
                );
            echo json_encode($info);
    	}
    }

    /**
    * @name update
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param stunum=>学号,sex=>性别,status=>状态,class_id=>班级号,province=>省份
    * @return 
    * @throws 
    * @todo 换成ajaxform,更新判断多样化
    * @var 
    * @version 1.0
    */
    public function update(){
        $student = M('student');
        $content = array(
                "stu_name" => I('post.stu_name'),
                "sex"  => I('post.stu_sex'),
                "class_id" => I('post.stu_class'),
                "province" => I('post.stu_province'),
                "status"   => I('post.status'),
            );
        $condition = array(
                "stu_id" => I('post.stu_id')
            );
        $goal = $student->where($condition)->data($content)->save();
        if($goal){
            $this->success('修改成功');
        }else{
            $this->error("修改失败");
        }
    }
    /**
    * @name addAnnex
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param 传入doc、docx、zip
    * @return 
    * @throws linux 未设置Public文件夹中EAnnex文件夹权限会报错
    * @todo 赞暂不支持多文件上传;前端未作ajaxform，用户体验想对一般；文件大小未设置限制，需上线后考虑
    * @var $log实例化Model添加日志
    * @version 1.0
    */
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
    /**
    * @name searchStudent
    * @access 教务处、root
    * @const 指明常量
    * @module Home
    * @param stunum=>学号,class_id=>班级号,province=>省份，idcard=>身份证,salt=>加密盐
    * @return $info[ "info"  => "xxxx",
                    "state" => x0x,
                    ]
    * @throws 
    * @todo 判断多样化
    * @var 
    * @version 1.0
    */
    public function addOne(){
        $salt = mt_rand(10,200000);
        $content = array(
            'stu_name' => I('post.addone_name'),
            'sex'      => I('post.addone_sex'),
            'stu_id'    => I('post.addone_stuid'),
            'province' => I('post.addone_province'),
            'class_id' => I('post.addone_classid'),
            'idcard'   => I('post.addone_idcard'),
            'password' => md5(hash('sha256', ($salt % 3))).sha1(substr(I('post.addone_idcard'),-6)),
            'salt'     => $salt,

        );
        foreach($content as $key => $value){
            if($value = null){
                $info = array(
                    "info"  => "请保证数据无空值",
                    "state" => 404,
                );
                echo json_encode($info);
            }
        }
        $student = M('student');
        $condition = array(
                "stu_id" => I('post.addone_stuid')
            );
        $goal_student = $student->where($condition)->find();
        if($goal_student){
            $info = array(
                    "info"  => "该学生已存在，添加失败",
                    "state" => 404,
                );
            echo json_encode($info);
        }else{
            $student->add($content);
            $info = array(
                "info"  => "添加成功",
                "state" => 200,
            );
            echo json_encode($info);
        }
    }

    public function _empty() {
        $this->display('404/index');
    }
}

