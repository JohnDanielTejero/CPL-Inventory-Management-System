<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'product_id';
    protected $fillable = [
        'Product_Name',
        'Product_Desc',
        'Product_Price',
        'Product_Paid',
        'Product_Payable',
        'Product_Markup',
        'Product_Image',
        'Product_Expiry',
        'Supplier_Id',
        'Category_Id'
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
