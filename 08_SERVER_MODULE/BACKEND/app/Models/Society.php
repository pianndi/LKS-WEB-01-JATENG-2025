<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Society extends Model
{
    use HasFactory;
    use HasApiTokens;

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }
    protected $guarded = [];
    protected $hidden = ['regional_id', 'login_tokens'];
}
