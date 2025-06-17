<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallmentStatus extends Model
{
    use HasFactory;

    public $table = 'installment_apply_status';

    public function month()
    {
        return $this->belongsTo(AvailableMonth::class, 'available_month_id');
    }
}
