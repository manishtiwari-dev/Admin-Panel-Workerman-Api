<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use ApiHelper;
use App\Models\GeneralSetting;
use App\Models\PaymentSetting;
use App\Models\WebsiteSetting;

class SettingController extends Controller
{
    /**
         Display a listing of the resource.
     */
    public function general_first(Request $request){
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.general')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $result = GeneralSetting::where('created_by', ApiHelper::get_adminid_from_token($api_token))->first();
        return ApiHelper::JSON_RESPONSE(true,$result,'Details updated !');
    }

    public function general(Request $request)
    {
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.general')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $saveData = $request->only('currency','default_language');
        $saveData['created_by'] = ApiHelper::get_adminid_from_token($api_token);
        
        $status = GeneralSetting::updateOrCreate(
            ['created_by' => ApiHelper::get_adminid_from_token($api_token)],
            $saveData
        );

        if ($status)
            return ApiHelper::JSON_RESPONSE(true,$status,'Details updated !');
        else
            return ApiHelper::JSON_RESPONSE(false,[],"Something error !");
           
    }

    /*
        Payment setting
    */

    public function payment_first(Request $request){
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.payment')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $result = PaymentSetting::where('created_by', ApiHelper::get_adminid_from_token($api_token))->first();
        return ApiHelper::JSON_RESPONSE(true,$result,'Details updated !');
    }

    public function payment(Request $request)
    {
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.general')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $saveData = $request->except('api_token');
        $saveData['created_by'] = ApiHelper::get_adminid_from_token($api_token);
        
        $status = PaymentSetting::updateOrCreate(
            ['created_by' => ApiHelper::get_adminid_from_token($api_token)],
            $saveData
        );

        if ($status)
            return ApiHelper::JSON_RESPONSE(true,$status,'Details updated !');
        else
            return ApiHelper::JSON_RESPONSE(false,[],"Something error !");
           
    }

    /*
        website setting
    */
    public function website_first(Request $request){
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.website')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $result = WebsiteSetting::where('created_by', ApiHelper::get_adminid_from_token($api_token))->first();
        return ApiHelper::JSON_RESPONSE(true,$result,'Details updated !');
    }

    public function website(Request $request)
    {
        // Validate user page access
        $api_token = $request->api_token;
        if(!ApiHelper::is_page_access($api_token,'setting.website')){
            return ApiHelper::JSON_RESPONSE(false,[],'Page access denied !');
        }
        $saveData = $request->only('website_name');
        $saveData['created_by'] = ApiHelper::get_adminid_from_token($api_token);
        
        $status = WebsiteSetting::updateOrCreate(
            ['created_by' => ApiHelper::get_adminid_from_token($api_token)],
            $saveData
        );

        if ($status)
            return ApiHelper::JSON_RESPONSE(true,$status,'Details updated !');
        else
            return ApiHelper::JSON_RESPONSE(false,[],"Something error !");
           
    }
}
