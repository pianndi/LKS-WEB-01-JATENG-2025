<?php

namespace App\Http\Controllers;

use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Validation::where('society_id', request()->user()->id)->first();

        return response([
            'validation' => $data ? [
                'id' => $data->id ?? null,
                'status' => $data->status ?? null,
                'job' => $data->job ?? null,
                'job_description' => $data->job_description ?? null,
                'income' => $data->income . '' ?? null,
                'reason_accepted' => $data->reason_accepted ?? null,
                'validator_notes' => $data->validator_notes ?? null,
                'validator' => $data->validator ?? null,
            ] : null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validation::create([
            'job' => request('job'),
            'job_description' => request('job_description'),
            'income' => request('income'),
            'reason_accepted' => request('reason_accepted'),
            'society_id' => request()->user()->id
        ]);
        return response([
            'message' => 'Request data validation sent successful'
        ]);
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
