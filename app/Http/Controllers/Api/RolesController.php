<?php

namespace App\Http\Controllers\Api;

use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use ApiHelper;


class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'role.view')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        
        $role_list = Role::with('permissions')->where('created_by',ApiHelper::get_adminid_from_token($api_token))->get();
        return ApiHelper::JSON_RESPONSE(true,$role_list,'');

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'role.create')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $user_id = ApiHelper::get_adminid_from_token($api_token);
        
        $role_name = $request->role_name.$user_id;
        $status = Role::where('name',$role_name)->first();
        if($status !== null){
            return ApiHelper::JSON_RESPONSE(false,[],'Already this role exist !');
        }else{
            
            $role = Role::create([
                'name' => $role_name,
                'created_by' => $user_id,
                'display_name'=>$request->role_name
            ]);
            
            $role->givePermissionTo($request->permission_name);
            if($role)
                return ApiHelper::JSON_RESPONSE(true,[],'Role created');
            else
                return ApiHelper::JSON_RESPONSE(false,[],'Unable to create role !');

        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'role.edit')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $role_list = Role::with('permissions')->find($request->updateId);
        return ApiHelper::JSON_RESPONSE(true,$role_list,'');

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
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'role.edit')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }

        $user_id = ApiHelper::get_adminid_from_token($api_token);

        $role_name = $request->role_name.$user_id;

        $status = Role::where('name',$role_name)->first();

        if($status !== null){
            $status->syncPermissions($request->permission_name);
            return ApiHelper::JSON_RESPONSE(true,[],'Already updated role exist ! Sync Permissions done !');
        }else{
            
            $role = Role::find($request->updateId)->update([
                'name' => $role_name,
                'created_by' => $user_id,
                'display_name'=>$request->role_name
            ]);
            $role->syncPermissions($request->permission_name);
            if($role)
                return ApiHelper::JSON_RESPONSE(true,[],'Role updated !');
            else
                return ApiHelper::JSON_RESPONSE(false,[],'Unable to update role !');
        }
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

        if(!ApiHelper::is_page_access($api_token,'role.destroy')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $role = Role::find($id);
        $role->revokePermissionTo($role->permissions);
        $status = Role::destroy($id);
        if($status) {
            return ApiHelper::JSON_RESPONSE(true,[],'Role deleted successfully');
        }else{
            return ApiHelper::JSON_RESPONSE(false,[],'Not able to delete !');
        }
    }
}
