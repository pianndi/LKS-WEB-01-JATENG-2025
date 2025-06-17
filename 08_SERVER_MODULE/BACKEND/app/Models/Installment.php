<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    use HasFactory;
    public $table = 'installment';
    protected $hidden = ['brand_id'];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function avaliable_month()
    {
        return $this->hasMany(AvailableMonth::class);
    }
}
