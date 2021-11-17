<?php
namespace App\Helper;

use App\models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ApiHelper
{

	/* 
        api token validate 
    */
    public static function api_token_validate($token){
        $user = User::where('api_token',$token)->first();
        return !empty($user)?true:false;
    }

    /* 
        check user_id has parent or not 
    */
	public static function get_parent_id($user_id){    
        $user = User::find($user_id);	
        return !empty($user->created_by)?$user->created_by:$user->id;
	}

    /* get user_id from token  */
    public static function get_user_id_from_token($token){    
        $user = User::where('api_token',$token)->first();   
        return $user->id;
    }

    /* get parent_id from token */
    public static function get_parentid_from_token($token){    
        $user = User::where('api_token',$token)->first();   
        return Self::get_parent_id($user->id);
    }

    /* 
        crate custom json reponse 
    */
    public static function JSON_RESPONSE($status,$data = array(),$msg){
        return response()->json([
            'status'=>$status,
            'data'=>$data,
            'message'=>$msg
        ]);
    }

    /* 
        get role name of user 
    */
    public static function get_role_from_token($token){
        $user = User::where('api_token',$token)->first();   
        return $user->roles[0]->name;   
    }

    /*
        function:get_permission_list
    */
    public static function get_permission_list(){
        $permission_array = [];
        $user = User::where('api_token',$token)->first();   
        foreach ($user->roles[0]->permissions as $key => $permission)
            $permission_array[$key] = $permission->name;            

        return $permission_array;
    }

    /*
        check user have permission access or not via user token,page_name 
    */
    public static function is_page_access($token, $permission_name){
        $role_name = Self::get_role_from_token($token);
        if($role_name == 'admin' || $role_name == 'superadmin'){
            if($role_name == 'admin' && $permission_name == 'permission')
                return false;
            else
                return true;

        }else{
            $permission_list = Self::get_permission_list();
            if(in_array($permission_name, $permission_list))
                return true;
            else
                return false;
        }
    }


}