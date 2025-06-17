<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function validator()
    {
        return $this->belongsTo(Validator::class);
    }
}
