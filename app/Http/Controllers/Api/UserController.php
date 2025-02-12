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

        $current_page = !empty($request->page)?$request->page:1;
        $perPage = !empty($request->perPage)?$request->perPage:10;
        $search = $request->search;
        $sortBy = $request->sortBy;
        $orderBy = $request->orderBy;
        
        $user_query = User::with("roles")->select('id','name','api_token','email','status','created_at')
                    ->where('created_by',ApiHelper::get_adminid_from_token($api_token));
        
        /* order by sorting */
        if(!empty($sortBy) && !empty($orderBy))
            $user_query = $user_query->orderBy($sortBy,$orderBy);
        else
            $user_query = $user_query->orderBy('id','DESC');
                    
        $skip = ($current_page == 1)?0:(int)($current_page-1)*$perPage;
        
        $user_count = $user_query->count();

        $user_list = $user_query->skip($skip)->take($perPage)->get();
        
        $res = [
            'data'=>$user_list,
            'current_page'=>$current_page,
            'total_records'=>$user_count,
            'total_page'=>ceil((int)$user_count/(int)$perPage),
            'per_page'=>$perPage,
        ];
        return ApiHelper::JSON_RESPONSE(true,$res,'');
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
            'created_by'=>ApiHelper::get_adminid_from_token($request->api_token),
            'api_token'=>Hash::make($request->name),
        ]);
        $user->assignRole($request->role_name);

        if($user){
            return ApiHelper::JSON_RESPONSE(true,[],'User created !');
        }else{
            return ApiHelper::JSON_RESPONSE(false,[],'Some issue !');
        }


    }
    
    public function edit(Request $request)
    {
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'user.edit')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $userdetail = User::find($request->updateId);
        if($userdetail != null){
            if(isset($userdetail->roles[0]))
                $userdetail->role_name = $userdetail->roles[0]->name;
            else
                $userdetail->role_name = '';

            return ApiHelper::JSON_RESPONSE(true,$userdetail,'');
        }else
            return ApiHelper::JSON_RESPONSE(false,[],'Something went wrong !');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // return ApiHelper::JSON_RESPONSE(true,$request->all(),'Profile updated successfully !');
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'user.edit')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $updateData = $request->only('name','status');
        if($request->has('password') && !empty($request->password))
            $updateData['password'] = Hash::make($request->password); 
        
        $status = User::find($request->updatedId)->update($updateData);
        
        if($request->has('role_name') && !empty($request->role_name))
            User::find($request->updatedId)->syncRoles($request->role_name);

        if($status)
            return ApiHelper::JSON_RESPONSE(true,[],'Profile updated successfully !');
        else
            return ApiHelper::JSON_RESPONSE(false,[],'Unable to updated !');
            
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $api_token = $request->api_token;
        $id = $request->deleteId;
        if(!ApiHelper::is_page_access($api_token,'user.destroy')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $status = User::destroy($id);
        if($status) {
            return ApiHelper::JSON_RESPONSE(true,[],'User deleted successfully');
        }else{
            return ApiHelper::JSON_RESPONSE(false,[],'Not able to delete !');
        }
    }

    
}
