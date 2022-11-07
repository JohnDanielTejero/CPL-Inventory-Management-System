<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'Purchase_By',
        'Purchase_Payable',
        'Purchase_Date',
    ];

    public function stock(){
        return $this->belongsToMany(Stock_Purchase::class, 'stock__purchases', 'purchase_id');
    }
}
