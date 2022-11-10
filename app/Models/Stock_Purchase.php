<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock_Purchase extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'stock_id',
        'purchase_id',
        'quantity',
    ];
}
