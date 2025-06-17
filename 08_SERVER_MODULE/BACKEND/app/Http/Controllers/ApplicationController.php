<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\InstallmentApply;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = InstallmentApply::where('society_id', request()->user()->id)->get();
        return response(
            [
                'instalments' => $data->map(fn($item) => [
                    'id' => $item->id,
                    'car' => $item->installment->cars,
                    'brand' => $item->installment->brand->brand,
                    'price' => $item->installment->price,
                    'description' => $item->installment->description,
                    'applications' => collect($item->applications)->map(fn($app) => [
                        'month' => $app->month->month . '',
                        'status' => $item->status,
                        'nominal' => '75000000',
                        'notes' => $item->notes,
                    ])
                ])
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
