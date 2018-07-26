<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\User;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow ($request)
    {
        return DB::table('password_resets')->where(['email' => $request->email , 'token' => $request->resetToken]);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json(['error' => 'El correo electrónico o el token no es correcto'],
        Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request)
    {   
        $user = User::whereEmail($request->email)->first();
        $user->update(['password' =>$request->password]);
        
        $this->getPasswordResetTableRow($request)->delete();

        return response()->json(['data' => 'Cambio de contraseña realizado con éxito'],
        Response::HTTP_CREATED);
    }
}
