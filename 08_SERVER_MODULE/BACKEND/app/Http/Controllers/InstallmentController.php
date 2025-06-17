<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\InstallmentApply;
use App\Models\Validation;
use Illuminate\Http\Request;

class InstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Installment::with('avaliable_month')->get();
        return response([
            'cars' => $data->map(fn($item) => [
                'id' => $item->id,
                'car' => $item->cars,
                'brand' => $item->brand->brand,
                'price' => $item->price,
                'description' => $item->description,
                'available_month' => collect($item->available_month)->map(fn($month) => [
                    'month' => $month->month,
                    'description' => $month->description
                ]),
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = request()->validate([
            'instalment_id' => 'required',
            'months' => 'required'
        ]);
        $validations = Validation::where('society_id', request()->user()->id)->first();
        if ($validations->status != 'accepted') {
            return response([
                'message' => "Your data hasn't accepted by validator"
            ], 401);
        }
        if (InstallmentApply::where('society_id', request()->user()->id)->where('installment_id', request('instalment_id'))->count() >= 1) {
            return response([
                'message' => "Application for a instalment can only be once",

            ], 401);
        }
        InstallmentApply::create([
            'installment_id' => request('instalment_id'),
            'available_month_id' => request('months'),
            'notes' => request('notes'),
            'society_id' => request()->user()->id
        ]);


        return response([
            'message' => 'Applying for Instalment successful'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Installment::where('id', $id)->first();
        return response([
            'instalment' => [
                'id' => $id,
                'car' => $item->cars,
                'brand' => $item->brand->brand,
                'price' => $item->price,
                'description' => $item->description,
                'available_month' => collect($item->available_month)->map(fn($month) => [
                    'month' => $month->month,
                    'description' => $month->description
                ]),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
