<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use ApiHelper;

class UserController extends Controller
{

    /* login through api */
    public function login(Request $request){
        if($request->has('email') && $request->has('password')){
            $res = User::where('email',$request->email)->first();    
            if($res != null){
                /* check account active or not */
                if($res->status == 'deactive'){
                    return ApiHelper::JSON_RESPONSE(false,[],'Currently your account is deactive. please contact to admin.');
                }
                /* passowrd match */
                if(Hash::check($request->password, $res->password)){
                    $response = [
                        'role'=>ApiHelper::get_role_from_token($res->api_token),
                        'permission'=>ApiHelper::get_permission_list($res->api_token),
                        'user'=>new UserResource($res)
                    ];
                    return ApiHelper::JSON_RESPONSE(true,$response,'Login success');
                }else{
                    return ApiHelper::JSON_RESPONSE(false,[],'Wrong password !');
                }
            }else{
                return ApiHelper::JSON_RESPONSE(false,[],'Wrong email !');
            }
            
        }else{
            return ApiHelper::JSON_RESPONSE(false,[],'Email or password missing');
        }
    }

    /* get all userlist */
    public function index(Request $request)
    {

        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'user.view')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $user_list = User::where('created_by',ApiHelper::get_user_id_from_token($api_token));
        
        return ApiHelper::JSON_RESPONSE(true,$user_list,'');
    }

    /* create user and assign role  */
    public function store(Request $request)
    {
        
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'user.create')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        // validation check 
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_name'=> 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiHelper::JSON_RESPONSE(false,[],$validator->messages());
        }

        // store user and assign role 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'created_by'=>ApiHelper::get_user_id_from_token($request->api_token),
        ]);
        $user->assignRole($request->role_name);

        if($user){
            return ApiHelper::JSON_RESPONSE(true,[],'User created !');
        }else{
            return ApiHelper::JSON_RESPONSE(false,[],'Some issue !');
        }


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'user.edit')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $updateData = $request->only('name','status');
        $status = User::find($id)->update($updateData);
        if($status)
            return ApiHelper::JSON_RESPONSE(true,[],'Profile updated successfully !');
        else
            return ApiHelper::JSON_RESPONSE(false,[],'Unable to updated !');
            
    }

    public function user_list(){
        return ApiHelper::JSON_RESPONSE(true,User::all(),'');
    }

    
}
