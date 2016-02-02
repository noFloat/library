<?php

namespace Home\Model;

use Org\Net\IpLocation;
use Think\Model;

class LogModel extends Model{
    private $_log;

    public function addLog($array){
        $content['content'] = $array;
        $content['datetime'] = date('Y-m-d H:i:s', time());
        $content['ClientIP'] = get_client_ip();
        $content['username'] = session('username');
        $this->_log = M('log');
        $result = $this->_log->add($content);
        return $result;
    }

    public function __call($method, $args){

        $Log = M('Home/Log');
        $this->logData = array(
            'Sender' => $args[0],
        );
        if (is_array($args[1])) {
            $wait = $args[1];
            if (is_callable($args[2], true)) {
                call_user_func_array($args[2], $wait);
            }

            $logData = array(
                'EventID' => $this->generateID($wait['Level']),
                'LogDate' => date('Y-m-d H:i:s', time()),
                'ClientIP' => get_client_ip(),
            );
            $this->logData = array_merge($this->logData, $logData, $wait);

            if (!$Log->validate($this->dateRule)->create($this->logData)) {
                return $Log->getError();
            }
            $save = $this->data($this->logData)->add();
            if (false == $save) return array('SQL Format' => $Log->_sql(), 'DB Error' => $Log->getDbError());
        }
        return true;
    }

}