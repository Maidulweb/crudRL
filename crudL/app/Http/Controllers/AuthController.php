<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|unique:users|max:255',
            'password' => 'required',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }

        $user = new User;

        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'name' => $user->username,
            'token'=> $token,
            'message' => 'Registered Successfully'
        ]);

    }
    public function Login(Request $request){
        
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }

        $user = User::where('email', $request->email)->first();
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
           
            return response()->json([
                'status' => 204,
                'warning' => 'The provided credentials are incorrect!!!!!'
            ]);
        }

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status' => 201,
            'token'=> $token,
            'name'=> $user->username,
            'success' => 'Login Successfully'
        ]);

        }
        public function logout (){
      

            Auth::user()->tokens()->delete();
         
            return response()->json([
                'status' => 2050,
                'success' => 'Logout Successfully'
            ]);
        }
}
