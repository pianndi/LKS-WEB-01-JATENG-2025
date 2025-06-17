<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallmentApply extends Model
{
    use HasFactory;
    public $table = 'installment_apply_societies';
    protected $hidden = ['installment_id', 'society_id'];

    protected $guarded = [];

    public $timestamps = false;

    public function installment()
    {
        return $this->belongsTo(Installment::class);
    }
    public function applications()
    {
        return $this->hasMany(InstallmentStatus::class, 'installment_apply_societies_id');
    }


}
