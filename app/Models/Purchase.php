<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $primaryKey = 'purchase_id';
    public $timestamps = false;
    protected $fillable = [
        'Purchase_By',
        'Purchase_Payable',
        'Purchase_Date',
        'store_id',
    ];

    public function store(){
        return $this->belongsTo(Store::class, 'store_id', 'stores_id');
    }

    public function stock(){
        return $this->belongsToMany(Stock::class, 'stock__purchases', 'purchase_id', 'stock_id')->withPivot(['quantity', 'price']);
    }
}
