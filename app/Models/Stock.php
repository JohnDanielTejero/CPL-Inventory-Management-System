<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $primaryKey = 'stock_id';
    public $timestamps = false;
    protected $fillable = [
        'Stock_Quantity',
        'Stock_Status',
        'Store_Id',
        'Product_Id',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class, 'Product_Id', 'product_id');
    }

    public function purchase()
    {
        return $this->belongsToMany(Purchase::class, 'stock__purchases', 'stock_id', 'purchase_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'Store_Id', 'stores_id');
    }
}

