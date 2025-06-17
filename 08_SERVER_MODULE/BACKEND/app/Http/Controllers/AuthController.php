<?php

namespace App\Http\Controllers;

use App\Models\Society;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login()
    {

        $user = Society::with('regional')->where('id_card_number', request('id_card_number'))->first();
        if (!$user || $user->password != request('password')) {
            return response([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        return response([
            'name' => $user->name,
            'born_date' => $user->born_date,
            'gender' => $user->gender,
            'address' => $user->address,
            'token' => $user->createToken('user')->plainTextToken,
            'regional' => $user->regional,
        ]);
    }

    public function logout()
    {
        request()->user()->currentAccessToken()->delete();
        return response([
            'message' => 'Logout success'
        ]);
    }

}
