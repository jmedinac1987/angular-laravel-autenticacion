<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\User;
use App\Mail\ResetPasswordMail;


class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if (!$this->validateEmail($request->email)) {
            return $this->faliedResponse();    
        }

        $this->send($request->email);

        return $this->successResponse();
    }

    public function send($email)
    {   
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));        
    }

    public function validateEmail($email)
    {   
        return User::where('email', $email)->first();
    }

    public function createToken($email)
    {   
        $urlToken = "http://localhost:4200/response-password-reset?token=";

        $tokenDataBase = DB::table('password_resets')->where('email', $email)->first();

        if( $tokenDataBase ){
            $oldToken = $urlToken . $tokenDataBase->token;
            return $oldToken;
        }

        $newToken = str_random(60);
        $this->saveToken($newToken, $email);
        
        $token = $urlToken . $newToken;

        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function faliedResponse()
    {
        return response()->json([
            'error' => 'El correo electrónico no se encuentra en nuestra base de datos'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'El correo electrónico de restablecimiento de contraseña se envió con éxito, verifique su bandeja de entrada'
        ], Response::HTTP_OK);
    }
}
