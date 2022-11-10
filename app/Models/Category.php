<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $primaryKey = 'category_id';
    protected $fillable = [
        'Category_Name',
        'Category_Desc',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
